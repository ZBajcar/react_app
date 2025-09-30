import type { BaseProduct, Product } from "../types";
import EditableProduct from "./EditableProduct";
import ProductSort from "./ProductSort";
import type { SortKey, SortDirection } from "../reducers/productReducer";

interface ProductListingProps {
  products: Product[];
  onUpdateProduct: (
    updatedProduct: BaseProduct,
    productId: string,
    onToggleEdit: () => void
  ) => void;
  onDeleteProduct: (productId: string) => void;
  onAddToCart: (productId: string) => void;
  onSort: (key: SortKey, direction: SortDirection) => void;
  currentSort: {
    key: SortKey;
    direction: SortDirection;
  };
}

const ProductListing = ({
  products,
  onUpdateProduct,
  onDeleteProduct,
  onAddToCart,
  onSort,
  currentSort,
}: ProductListingProps) => {
  return (
    <div className="product-listing">
      <div className="product-listing-header">
        <h2>Products</h2>
        <ProductSort onSort={onSort} currentSort={currentSort} />
      </div>
      <ul className="product-list">
        {products.map((product) => (
          <EditableProduct
            key={product._id}
            product={product}
            onUpdateProduct={onUpdateProduct}
            onDeleteProduct={onDeleteProduct}
            onAddToCart={onAddToCart}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProductListing;
