import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Signup from "./pages/Signup";

import Signin from "./pages/Signin";
import Header from "./components/Header";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";
import ProtectRoute from "./components/ProtectRoute";
import Listing from "./pages/Listing";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route element={<ProtectRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/listing" element={<Listing />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
