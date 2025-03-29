import Homepage from "./pages/Homepage";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "./redux/reducers/authSlice";
import Profilepage from "./pages/Profilepage";
import Addproduct from "./pages/Addproduct";
import ProductPage from "./pages/ProductPage";
import ProductDetail from "./pages/ProductDetail";
import Addtocart from "./pages/Addtocart";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(refreshToken())
      .unwrap()
      .catch(() => {
        navigate("/login");
      });
  }, []);

  return (
    <div className="max-w-[1600px] m-auto">
      <Toaster />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<Profilepage />} />
        <Route path="/add-product" element={<Addproduct />} />
        <Route path="/add-to-cart" element={<Addtocart />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/products/:string" element={<ProductPage />} />


      </Routes>
    </div>
  );
}

export default App;
