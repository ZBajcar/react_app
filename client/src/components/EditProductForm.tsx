import React from "react";
import type { BaseProduct, Product } from "../types";

interface EditProductFormProps {
  product: Product;
  onToggleEdit: () => void;
  onUpdateProduct: (
    updatedProduct: BaseProduct,
    productId: string,
    onToggleEdit: () => void
  ) => void;
}

const EditProductForm = ({
  product,
  onToggleEdit,
  onUpdateProduct,
}: EditProductFormProps) => {
  const [formData, setFormData] = React.useState({
    title: product.title,
    price: product.price,
    quantity: product.quantity,
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onUpdateProduct(formData, product._id, onToggleEdit);
  };

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form>
        <div className="input-group">
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            id="product-name"
            name="product-name"
            required
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-price">Price:</label>
          <input
            type="number"
            id="product-price"
            name="product-price"
            min="0"
            step="0.01"
            required
            value={formData.price}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, price: +e.target.value }))
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-quantity">Quantity:</label>
          <input
            type="number"
            id="product-quantity"
            name="product-quantity"
            min="0"
            required
            value={formData.quantity}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, quantity: +e.target.value }))
            }
          />
        </div>
        <div className="actions form-actions">
          <button type="submit" onClick={handleSubmit}>
            Update
          </button>
          <button type="button" onClick={onToggleEdit}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
