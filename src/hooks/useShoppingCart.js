import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

const ShoppingCartContext = createContext({
  products: [],  
  handleAddProduct: () => {},
});

export function useShoppingCart() {
  const data = useContext(ShoppingCartContext);
  return data;
}

export function ShoppingCartProvider(props) {
  const [products, setProducts] = useState([]);
  const handleAddProduct = useCallback((newProduct) => {
    setProducts((currentProducts) => {
      if (currentProducts.some((product) => product.id === newProduct.id))
        return currentProducts;
      return [...currentProducts, newProduct];
    });
  }, []);
  //console.log("context", { products });
  const value = useMemo(() => {
    return {
      products,
      handleAddProduct,
    };
  }, [products, handleAddProduct]);

  useEffect(function syncFromLocalStorage() {
    const persistedProducts = localStorage.getItem("products");
    if (persistedProducts) {
      setProducts(JSON.parse(persistedProducts));
    }
  }, []);
  useEffect(
    function syncToLocalStorage() {
      if (products.length > 0) {
        localStorage.setItem("products", JSON.stringify(products));
      }
    },
    [products]
  );

  return (
    <ShoppingCartContext.Provider
      value={value}
      {...props}
    ></ShoppingCartContext.Provider>
  );
}
