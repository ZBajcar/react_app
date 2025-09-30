import type { CartItem } from "../types";

type CartAction =
  | { type: "FETCH_CART"; payload: CartItem[] }
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "CLEAR_CART" };

export const cartReducer = (
  state: CartItem[],
  action: CartAction
): CartItem[] => {
  switch (action.type) {
    case "FETCH_CART":
      return action.payload;
    case "ADD_TO_CART":
      const existingItem = state.find(
        (item) => item.productId === action.payload.productId
      );

      if (existingItem) {
        return state.map((item) =>
          item.productId === action.payload.productId ? action.payload : item
        );
      } else {
        return [...state, action.payload];
      }
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

export const fetchCartAction = (items: CartItem[]): CartAction => ({
  type: "FETCH_CART",
  payload: items,
});

export const addToCartAction = (item: CartItem): CartAction => ({
  type: "ADD_TO_CART",
  payload: item,
});

export const clearCartAction = (): CartAction => ({
  type: "CLEAR_CART",
});
