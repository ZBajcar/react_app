import React from "react";
import type { BaseProduct } from "../types";
import useToggle from "../hooks/useToggle";

interface ToggleableAddProductForm {
  onAddProduct: (product: BaseProduct, onToggleForm: () => void) => void;
}

const ToggleableAddProductForm = ({
  onAddProduct,
}: ToggleableAddProductForm) => {
  const [isVisible, toggle] = useToggle(false);
  const [formData, setFormData] = React.useState({
    title: "",
    price: NaN,
    quantity: NaN,
  });

  const handleToggleForm = () => {
    toggle();
    setFormData({
      title: "",
      price: NaN,
      quantity: NaN,
    });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onAddProduct(formData, handleToggleForm);
  };

  return (
    <>
      {isVisible ? (
        <div className="add-form">
          <form onSubmit={handleSubmit}>
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
                value={Number.isNaN(formData.price) ? "" : formData.price}
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
                value={Number.isNaN(formData.quantity) ? "" : formData.quantity}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    quantity: +e.target.value,
                  }))
                }
              />
            </div>
            <div className="actions form-actions">
              <button type="submit">Add</button>
              <button type="button" onClick={handleToggleForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <p>
          <button className="add-product-button" onClick={handleToggleForm}>
            Add A Product
          </button>
        </p>
      )}
    </>
  );
};

export default ToggleableAddProductForm;
