import { CssBaseline } from "@mui/material";
import { Home } from "./screens/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Error } from "./screens/Error";
import { Product } from "./screens/Product";
import { ShopApolloClient } from "./config/apollo";
import { ShoppingCartProvider } from "./hooks/useShoppingCart";
import ShoppingCart from "./screens/ShoppingCart";

function App() {
  return (
    <div>
      <CssBaseline />
      <ShopApolloClient>
       <ShoppingCartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:slug/*" element={<Product />} />
              <Route path="*" element={<Error />} />
              <Route path="/cart" element={<ShoppingCart />} />
            </Routes>
          </BrowserRouter>
        </ShoppingCartProvider>
      </ShopApolloClient>
    </div>
  );
}

export default App;
