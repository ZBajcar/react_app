import React from "react";
import type { CartItem as CartItemType } from "../types";
import { CurrencyContext } from "../context/CurrencyContext";
import { formatPrice } from "../helpers/helpers";

interface CartItemProps extends CartItemType {}

const CartItem = ({ title, quantity, price }: CartItemProps) => {
  const { currency, rates } = React.useContext(CurrencyContext);

  return (
    <tr data-testid={`cartItem-${title}`}>
      <td>{title}</td>
      <td>{quantity}</td>
      <td>{formatPrice(price, currency, rates)}</td>
    </tr>
  );
};

export default CartItem;
