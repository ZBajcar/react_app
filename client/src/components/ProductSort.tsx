import type { SortKey, SortDirection } from "../reducers/productReducer";

interface ProductSortProps {
  onSort: (key: SortKey, direction: SortDirection) => void;
  currentSort: {
    key: SortKey;
    direction: SortDirection;
  };
}

const ProductSort = ({ onSort, currentSort }: ProductSortProps) => {
  const handleSortChange = (key: SortKey) => {
    let direction: SortDirection = "asc";

    if (currentSort.key === key) {
      direction = currentSort.direction === "asc" ? "desc" : "asc";
    }

    onSort(key, direction);
  };

  const getSortIndicator = (key: SortKey) => {
    if (currentSort.key !== key) return null;
    return currentSort.direction === "asc" ? " ↑" : " ↓";
  };

  return (
    <div className="sort-controls">
      <span>Sort by: </span>
      <button
        className={`sort-button ${currentSort.key === "title" ? "active" : ""}`}
        onClick={() => handleSortChange("title")}
      >
        Name{getSortIndicator("title")}
      </button>
      <button
        className={`sort-button ${currentSort.key === "price" ? "active" : ""}`}
        onClick={() => handleSortChange("price")}
      >
        Price{getSortIndicator("price")}
      </button>
      <button
        className={`sort-button ${
          currentSort.key === "quantity" ? "active" : ""
        }`}
        onClick={() => handleSortChange("quantity")}
      >
        Quantity{getSortIndicator("quantity")}
      </button>
    </div>
  );
};

export default ProductSort;
