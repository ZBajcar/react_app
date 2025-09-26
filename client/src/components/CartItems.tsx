import type { CartItem as CartItemType } from "../types";
import CartItem from "./CartItem";

interface CartItemProps {
  cartItems: CartItemType[];
}

const CartItems = ({ cartItems }: CartItemProps) => {
  return (
    <table className="cart-items">
      <thead>
        <tr>
          <th scope="col">Item</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem._id} {...cartItem} />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3} className="total">
            Total: $
            {cartItems
              .reduce((acc, item) => acc + item.price * item.quantity, 0)
              .toFixed(2)}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default CartItems;
