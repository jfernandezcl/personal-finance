import { render, screen } from "@testing-library/react";
import EditProfile from "../pages/EditProfile";
import { MemoryRouter } from "react-router-dom";

jest.mock("../authenticity/ProtectedRoute", () => ({
  __esModule: true,
  default: ({ children }) => children,
}));

test("muestra los textos 'Profile' y 'Home'", () => {
  localStorage.setItem("token", "fake.token.value");

  render(
    <MemoryRouter>
      <EditProfile />
    </MemoryRouter>
  );

  expect(screen.getByText("Profile")).toBeInTheDocument();
  expect(screen.getByText("Home")).toBeInTheDocument();
});
