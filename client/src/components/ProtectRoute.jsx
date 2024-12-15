import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectRoute() {
  const user = useSelector((state) => state.user);
  const currentUser = user.currentUser?.data;
  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
}
