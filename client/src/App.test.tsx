import App from "./App";
import { render, screen } from "@testing-library/react";
//import userEvent from "@testing-library/user-event";
import { it, expect, vi, afterEach } from "vitest";
import { getProducts, getCartItems } from "./services/products";

vi.mock("./services/products");

const mockedGetProducts = vi.mocked(getProducts);
const mockedGetCartItems = vi.mocked(getCartItems);

afterEach(() => {
  vi.resetAllMocks();
});

it("Displays the product on initial render", async () => {
  const mockedProducts = [
    {
      _id: "1",
      title: "Amazon Kindle E-reader",
      quantity: 5,
      price: 79.99,
    },
    {
      _id: "2",
      title: "Apple 10.5-Inch iPad Pro",
      quantity: 0,
      price: 649.99,
    },
  ];

  mockedGetProducts.mockResolvedValue(mockedProducts);
  mockedGetCartItems.mockResolvedValue([]);

  render(<App />);

  expect(
    await screen.findByText(/Amazon Kindle E-reader/i)
  ).toBeInTheDocument();
});

it("Displays the cart item on initial render if there are cart items in the cart", async () => {
  const mockedCart = [
    {
      _id: "a1",
      productId: "1",
      title: "Amazon Kindle E-reader",
      quantity: 1,
      price: 79.99,
    },
    {
      _id: "a2",
      productId: "2",
      title: "Apple 10.5-Inch iPad Pro",
      quantity: 3,
      price: 649.99,
    },
  ];

  mockedGetProducts.mockResolvedValue([]);
  mockedGetCartItems.mockResolvedValue(mockedCart);

  render(<App />);

  expect(
    await screen.findByText(/Apple 10.5-Inch iPad Pro/i)
  ).toBeInTheDocument();
});

it("Shows a message when the cart is empty", async () => {
  mockedGetProducts.mockResolvedValue([]);
  mockedGetCartItems.mockResolvedValue([]);

  render(<App />);

  expect(await screen.findByText(/Your cart is empty/i)).toBeInTheDocument();
});
