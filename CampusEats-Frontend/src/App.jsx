import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import MenuList from "./features/menu/components/MenuList";
import SAMPLE from "./features/menu/pages/MenuPage";
import MenuPage from "./features/menu/pages/MenuPage";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import DishDetailPage from "./features/menu/pages/DishDetailPage";
import OrderPage from "./features/menu/pages/OrderPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>CampusEats Dashboard</h1>
      {/* <MenuList dishes={SAMPLE} />
      <MenuPage /> */}

      <nav className="nav">
        <NavLink to="/">Menu</NavLink> |
        <NavLink to="/order">Place Order</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/dish/:id" element={<DishDetailPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="*" element={<p>404 — Page not found</p>} />
      </Routes>
    </>
  );
}

export default App;
