import React from "react";

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      if (!item) {
        return initialValue;
      }

      try {
        const parsedItem = JSON.parse(item) as T;
        if (
          key === "theme" &&
          parsedItem !== "light" &&
          parsedItem !== "dark"
        ) {
          return initialValue;
        }
        return parsedItem;
      } catch (parseError) {
        localStorage.removeItem(key);
        return initialValue;
      }
    } catch (error) {
      console.warn(`Error accessing localStorage for key "${key}":`, error);
      return initialValue;
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error saving to localStorage for key "${key}":`, error);
    }
  }, [storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
