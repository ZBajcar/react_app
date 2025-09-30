import React from "react";
import ProductListing from "./components/ProductListing";
import ShoppingCart from "./components/ShoppingCart";
import ToggleableAddProductForm from "./components/ToggleableAddProductForm";
import type { BaseProduct } from "./types";
import {
  getCartItems,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  checkout,
  addToCart,
} from "./services/products";
import {
  productReducer,
  fetchProductsAction,
  addProductAction,
  updateProductAction,
  deleteProductAction,
} from "./reducers/productReducer";
import {
  cartReducer,
  fetchCartAction,
  addToCartAction,
  clearCartAction,
} from "./reducers/cartReducer";
import {
  SortKey,
  SortDirection,
  sortProductsAction,
} from "./reducers/productReducer";

function App() {
  const [productState, dispatchProducts] = React.useReducer(productReducer, {
    items: [],
    sort: {
      key: "title",
      direction: "asc",
    },
  });
  const [cartItems, dispatchCartItems] = React.useReducer(cartReducer, []);

  const handleSort = (key: SortKey, direction: SortDirection) => {
    dispatchProducts(sortProductsAction(key, direction));
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const [productsData, cartItemsData] = await Promise.all([
        getProducts(),
        getCartItems(),
      ]);
      dispatchProducts(fetchProductsAction(productsData));
      dispatchCartItems(fetchCartAction(cartItemsData));
    };
    try {
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleAddProduct = async (
    newProduct: BaseProduct,
    callback?: () => void
  ) => {
    try {
      const data = await addProduct(newProduct);
      dispatchProducts(addProductAction(data));
      if (callback) {
        callback();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateProduct = async (
    updatedProduct: BaseProduct,
    productId: string,
    callback?: () => void
  ) => {
    try {
      const data = await updateProduct(updatedProduct, productId);
      dispatchProducts(updateProductAction(data));
      if (callback) {
        callback();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
      dispatchProducts(deleteProductAction(productId));
    } catch (e) {
      console.error(e);
    }
  };

  const handleCheckout = async () => {
    try {
      await checkout();
      dispatchCartItems(clearCartAction());
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddToCart = async (productId: string) => {
    const product = productState.items.find(
      (product) => product._id === productId
    );
    if (!product || product.quantity === 0) return;
    try {
      const { product: updatedProduct, item } = await addToCart(productId);
      dispatchProducts(updateProductAction(updatedProduct));
      dispatchCartItems(addToCartAction(item));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div id="app">
      <ShoppingCart cartItems={cartItems} onCheckout={handleCheckout} />

      <main>
        <ProductListing
          products={productState.items}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onAddToCart={handleAddToCart}
          onSort={handleSort}
          currentSort={productState.sort}
        />
        <ToggleableAddProductForm onAddProduct={handleAddProduct} />
      </main>
    </div>
  );
}

export default App;
