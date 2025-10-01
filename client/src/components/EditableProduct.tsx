import React from "react";
import EditProductForm from "./EditProductForm";
import type { BaseProduct, Product } from "../types";
import { CurrencyContext } from "../context/CurrencyContext";
import { formatPrice } from "../helpers/helpers";
import useToggle from "../hooks/useToggle";

interface EditableProductProps {
  product: Product;
  onUpdateProduct: (
    updatedProduct: BaseProduct,
    productId: string,
    onToggleEdit: () => void
  ) => void;
  onDeleteProduct: (productId: string) => void;
  onAddToCart: (productId: string) => void;
}

const EditableProduct = ({
  product,
  onUpdateProduct,
  onDeleteProduct,
  onAddToCart,
}: EditableProductProps) => {
  const [isEditing, toggle] = useToggle(false);
  const { currency, rates } = React.useContext(CurrencyContext);

  return (
    <>
      <li className="product">
        <div className="product-details">
          <h3>{product.title}</h3>
          <p className="price">{formatPrice(product.price, currency, rates)}</p>
          <p className="quantity">{product.quantity} left in stock</p>
          <div className="actions product-actions">
            <button
              className="add-to-cart"
              disabled={product.quantity === 0}
              onClick={() => onAddToCart(product._id)}
            >
              Add to Cart
            </button>
            <button className="edit" onClick={toggle}>
              Edit
            </button>
          </div>
          <button
            className="delete-button"
            onClick={() => onDeleteProduct(product._id)}
          >
            <span>X</span>
          </button>
        </div>
        {isEditing && (
          <EditProductForm
            product={product}
            onToggleEdit={toggle}
            onUpdateProduct={onUpdateProduct}
          />
        )}
      </li>
    </>
  );
};

export default EditableProduct;
