import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Header from "../components/organisms/Header";

test("必要な項目が表示されている", () => {
  render(<Header />, { wrapper: BrowserRouter });

  expect(screen.getByRole("heading")).toHaveTextContent("Vermouth");

  expect(screen.getAllByRole("listitem")).toHaveLength(7);

  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("About")).toBeInTheDocument();
  expect(screen.getByText("Contact")).toBeInTheDocument();
  expect(screen.getByText("Order")).toBeInTheDocument();
  expect(screen.getByText("Online Shop")).toBeInTheDocument();
});

test("正しいリンク先が紐付けられている", () => {
  render(<Header />, { wrapper: BrowserRouter });

  expect(screen.getByRole("link", { name: "Vermouth" })).toHaveAttribute(
    "href",
    "/"
  );

  expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
    "href",
    "/"
  );

  expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
    "href",
    "/about"
  );

  expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
    "href",
    "/contact"
  );

  expect(screen.getByRole("link", { name: "Order" })).toHaveAttribute(
    "href",
    "/order"
  );

  expect(screen.getByRole("link", { name: "Online Shop" })).toHaveAttribute(
    "href",
    "/online-shop"
  );
});
