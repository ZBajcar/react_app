import type { CartItem } from "../types";
import CartItems from "./CartItems";

interface ShoppingCartProps {
  cartItems: CartItem[];
}

const ShoppingCart = ({ cartItems }: ShoppingCartProps) => {
  return (
    <header>
      <h1>The Shop!</h1>
      <div className="cart">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <div className="cart">
            <p>Your cart is empty</p>
            <p>Total: $0</p>
          </div>
        ) : (
          <CartItems cartItems={cartItems} />
        )}
        <button className="checkout" disabled={cartItems.length === 0}>
          Checkout
        </button>
      </div>
    </header>
  );
};

export default ShoppingCart;
