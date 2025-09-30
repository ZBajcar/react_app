import type { Product } from "../types";

export type SortKey = "title" | "price" | "quantity";
export type SortDirection = "asc" | "desc";

export const sortProducts = (
  products: Product[],
  key: SortKey,
  direction: SortDirection
): Product[] => {
  return [...products].sort((a, b) => {
    let aValue = a[key];
    let bValue = b[key];

    if (key === "title") {
      aValue = (aValue as string).toLowerCase();
      bValue = (bValue as string).toLowerCase();
    }

    if (direction === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });
};

export interface SortState {
  key: SortKey;
  direction: SortDirection;
}

export interface ProductState {
  items: Product[];
  sort: SortState;
}

//----------------------------------------------

type ProductAction =
  | { type: "FETCH_PRODUCTS"; payload: Product[] }
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "UPDATE_PRODUCT"; payload: Product }
  | { type: "DELETE_PRODUCT"; payload: string }
  | { type: "SORT_PRODUCTS"; payload: SortState };

const initialState: ProductState = {
  items: [],
  sort: {
    key: "title",
    direction: "asc",
  },
};

export const productReducer = (
  state: ProductState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return {
        items: sortProducts(
          action.payload,
          state.sort.key,
          state.sort.direction
        ),
        sort: state.sort,
      };

    case "ADD_PRODUCT":
      const newItems = [...state.items, action.payload];
      return {
        items: sortProducts(newItems, state.sort.key, state.sort.direction),
        sort: state.sort,
      };

    case "UPDATE_PRODUCT":
      const updatedItems = state.items.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
      return {
        items: sortProducts(updatedItems, state.sort.key, state.sort.direction),
        sort: state.sort,
      };

    case "DELETE_PRODUCT":
      return {
        items: state.items.filter((product) => product._id !== action.payload),
        sort: state.sort,
      };

    case "SORT_PRODUCTS":
      return {
        items: sortProducts(
          state.items,
          action.payload.key,
          action.payload.direction
        ),
        sort: action.payload,
      };

    default:
      return state;
  }
};

export const sortProductsAction = (
  key: SortKey,
  direction: SortDirection
): ProductAction => ({
  type: "SORT_PRODUCTS",
  payload: { key, direction },
});

export const fetchProductsAction = (products: Product[]): ProductAction => ({
  type: "FETCH_PRODUCTS",
  payload: products,
});

export const addProductAction = (product: Product): ProductAction => ({
  type: "ADD_PRODUCT",
  payload: product,
});

export const updateProductAction = (product: Product): ProductAction => ({
  type: "UPDATE_PRODUCT",
  payload: product,
});

export const deleteProductAction = (productId: string): ProductAction => ({
  type: "DELETE_PRODUCT",
  payload: productId,
});
