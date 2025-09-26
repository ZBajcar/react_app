import React from "react";
import ProductListing from "./components/ProductListing";
import ShoppingCart from "./components/ShoppingCart";
import ToggleableAddProductForm from "./components/ToggleableAddProductForm";
import { type Product, type CartItem, type BaseProduct } from "./types";
import {
  getCartItems,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  checkout,
} from "./services/products";

function App() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const [productsData, cartItemsData] = await Promise.all([
        getProducts(),
        getCartItems(),
      ]);
      setProducts(productsData);
      setCartItems(cartItemsData);
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
      setProducts((prevState) => prevState.concat(data));
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
      setProducts((prevState) => {
        return prevState.map((product) => {
          if (product._id === data._id) {
            return data;
          } else {
            return product;
          }
        });
      });
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
      setProducts((prevState) =>
        prevState.filter((product) => product._id !== productId)
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleCheckout = async () => {
    try {
      await checkout();
      setCartItems([]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div id="app">
      <ShoppingCart cartItems={cartItems} onCheckout={handleCheckout} />

      <main>
        <ProductListing
          products={products}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
        />
        <ToggleableAddProductForm onAddProduct={handleAddProduct} />
      </main>
    </div>
  );
}

export default App;
