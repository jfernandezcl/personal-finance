import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../components/Header";
import { BrowserRouter } from "react-router-dom";

test("muestra el texto 'Personal finance' en el header", () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  expect(screen.getByText("Personal Finance")).toBeInTheDocument();
});
