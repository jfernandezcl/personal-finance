const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Header from "../components/Header";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const renderHeader = () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
};

beforeEach(() => {
  localStorage.clear();
  mockedNavigate.mockClear();
});

test("displays the text 'Personal finance' in the header", () => {
  renderHeader();
  expect(screen.getByText("Personal Finance")).toBeInTheDocument();
});

test("displays the user's initials in the header", () => {
  localStorage.setItem("username", "John Doe");
  renderHeader();

  expect(screen.getByText("JD")).toBeInTheDocument();
});

test("toggles dropdown menu when avatar button is clicked", async () => {
  localStorage.setItem("username", "Jane Smith");
  renderHeader();

  const user = userEvent.setup();
  const avatarButton = screen.getByRole("button");

  expect(screen.queryAllByRole("menu").length).toBe(0);

  await user.click(avatarButton);
  expect(screen.getByRole("menu")).toBeInTheDocument();

  await user.click(avatarButton);
  expect(screen.queryByRole("menu")).not.toBeInTheDocument();
});

test.only("logout button clears localStorage and navigates to /", async () => {
  localStorage.setItem("username", "Jane Smith");
  localStorage.setItem("token", "false-token");
  renderHeader();

  const user = userEvent.setup();

  const avatarButton = screen.getByRole("button");
  await user.click(avatarButton);

  const logoutButton = await screen.findByText("Log out");

  await user.click(logoutButton);

  expect(localStorage.getItem("username")).toBeNull();
  expect(localStorage.getItem("token")).toBeNull();

  await waitFor(() => {
    expect(mockedNavigate).toHaveBeenCalledWith("/");
  });
});
