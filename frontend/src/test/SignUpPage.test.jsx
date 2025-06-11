import { fireEvent, render, screen } from "@testing-library/react";
import SignUpPage from "../pages/SignUpPage";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

globalThis.fetch = jest.fn(() => ({
  ok: true,
  json: () =>
    Promise.resolve({
      username: "Mock User",
      email: "mock@email.com",
      password: "mockpassword",
      repeatPassword: "mockpassword",
    }),
}));

const renderSignUpPage = () => {
  render(
    <GoogleOAuthProvider clientId="test-client-id">
      <BrowserRouter>
        <SignUpPage />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

beforeEach(() => {
  localStorage.clear();
  fetch.mockClear();
  renderSignUpPage();
});

test("find the text ‘Personal finances’ on the SignUpPage", () => {
  expect(screen.getByText("Personal finances")).toBeInTheDocument();
});

test("logs in user and shows success message", async () => {
  fireEvent.change(screen.getByPlaceholderText("Enter your full name"), {
    target: { value: "Mock User" },
  });

  fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
    target: { value: "mock@email.com" },
  });

  fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
    target: { value: "Password123" },
  });

  fireEvent.change(screen.getByPlaceholderText("Re-enter your password"), {
    target: { value: "Password123" },
  });

  fireEvent.click(screen.getByText("Create account"));

  const successMessage = await screen.findByText("Registration successful!");
  expect(successMessage).toBeInTheDocument();
});
