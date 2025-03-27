import Homepage from "./pages/Homepage";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshToken } from "./redux/reducers/authSlice";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      </Routes>
    </div>
  );
}

export default App;
