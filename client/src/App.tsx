import React from "react";
import ProductListing from "./components/ProductListing.tsx";
import ShoppingCart from "./components/ShoppingCart.tsx";
import ToggleableAddProductForm from "./components/ToggleableAddProductForm.tsx";
import {
  type Product,
  type CartItem,
  type BaseProduct,
} from "./types/index.ts";
import {
  getCartItems,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./services/products.ts";

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

  return (
    <div id="app">
      <ShoppingCart />

      <main>
        <ProductListing
          products={products}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
        />
        <ToggleableAddProductForm />
      </main>
    </div>
  );
}

export default App;
