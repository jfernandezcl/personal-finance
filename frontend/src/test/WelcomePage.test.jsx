import { fireEvent, render, screen } from "@testing-library/react";
import WelcomePage from "../pages/WelcomePage";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

globalThis.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        token: "mock-token",
        username: "mockuser",
        email: "mock@email.com",
      }),
  })
);

const renderWelcomePage = () => {
  render(
    <GoogleOAuthProvider clientId="test-client-id">
      <BrowserRouter>
        <WelcomePage />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

beforeEach(() => {
  localStorage.clear();
  fetch.mockClear();
});

test("find the text ‘Personal finances’ on the WelcomePage", () => {
  expect(screen.getByText("Personal finances")).toBeInTheDocument();
});

test.only("logs in user and shows success message", async () => {
  renderWelcomePage();

  fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
    target: { value: "user@email.com" },
  });

  fireEvent.change(
    screen.getByPlaceholderText("6+ Characters, 1 Capital letter"),
    {
      target: { value: "Password123" },
    }
  );

  fireEvent.click(screen.getByDisplayValue("Sign In"));

  const successMessage = await screen.findByText("Login successful!");
  expect(successMessage).toBeInTheDocument();

  expect(localStorage.getItem("token")).toBe("mock-token");
  expect(localStorage.getItem("username")).toBe("mockuser");
  expect(localStorage.getItem("email")).toBe("mock@email.com");
});
