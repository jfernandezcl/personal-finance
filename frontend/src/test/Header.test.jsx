import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../components/Header";
import { BrowserRouter } from "react-router-dom";

const renderHeader = () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
};

test("displays the text 'Personal finance' in the header", () => {
  renderHeader();
  expect(screen.getByText("Personal Finance")).toBeInTheDocument();
});

test("displays the user's initials in the header", () => {
  localStorage.setItem("username", "John Doe");
  renderHeader();

  expect(screen.getByText("JD")).toBeInTheDocument();
});
