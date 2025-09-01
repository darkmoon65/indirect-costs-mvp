import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/app";
import Sidebar from "../components/sidebar";
import Home from "../pages/home";
import Costos from "../pages/costos";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/precios-base" element={<Home />} />
          <Route path="/waste" element={<Home />} />
          <Route path="/costos-indirectos" element={<Costos />} />
          <Route path="/tipo-cliente" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
