import React from "react";
import type { CartItem } from "../types";
import CartItems from "./CartItems";
import { ThemeContext } from "../context/ThemeContext";
import { CurrencyContext } from "../context/CurrencyContext";
import { formatPrice } from "../helpers/helpers";

interface ShoppingCartProps {
  cartItems: CartItem[];
  onCheckout: () => void;
}

const ShoppingCart = ({ cartItems, onCheckout }: ShoppingCartProps) => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const { currency, toggleCurrency, rates } = React.useContext(CurrencyContext);

  return (
    <header>
      <div className="header-content">
        <div className="header-left">
          <h1>The Shop!</h1>
          <div className="header-controls">
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            <button className="currency-toggle" onClick={toggleCurrency}>
              {currency}
            </button>
          </div>
        </div>

        <div className="cart">
          <h2>Your Cart</h2>
          {cartItems.length === 0 ? (
            <div className="cart">
              <p>Your cart is empty</p>
              <p>Total: {formatPrice(0, currency, rates)}</p>
            </div>
          ) : (
            <CartItems cartItems={cartItems} />
          )}
          <div className="checkout-button">
            <button
              className="checkout"
              disabled={cartItems.length === 0}
              onClick={onCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ShoppingCart;
