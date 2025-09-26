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
  addToCart,
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

  const handleAddToCart = async (productId: string) => {
    const product = products.find((product) => product._id === productId);
    const existingItem = cartItems.find(
      (cartItem) => cartItem.productId === productId
    );
    if (!product || product.quantity === 0) return;
    try {
      const { product: updatedProduct, item } = await addToCart(productId);
      setProducts((prev) => {
        return prev.map((product) => {
          if (product._id === updatedProduct._id) {
            return updatedProduct;
          } else {
            return product;
          }
        });
      });
      setCartItems((prev) => {
        if (existingItem) {
          return prev.map((cartItem) => {
            if (cartItem.productId === productId) {
              return item;
            } else {
              return cartItem;
            }
          });
        } else {
          return prev.concat(item);
        }
      });
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
          onAddToCart={handleAddToCart}
        />
        <ToggleableAddProductForm onAddProduct={handleAddProduct} />
      </main>
    </div>
  );
}

export default App;
