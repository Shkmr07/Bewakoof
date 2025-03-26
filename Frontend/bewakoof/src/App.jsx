import Homepage from "./pages/Homepage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <div className="max-w-[1600px] m-auto">
        <Toaster />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
