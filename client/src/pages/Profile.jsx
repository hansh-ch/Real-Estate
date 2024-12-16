import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_USER_URL,
  LOGOUT_URL,
  UPDATE_USER_URL,
} from "../utils/constants";
import { toast } from "react-toastify";
import { updateUserSuccess, deleteUser, logoutUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const currentUser = user.currentUser?.data;

  useEffect(
    function () {
      if (currentUser) {
        setUsername(() => currentUser.username);
        setEmail(() => currentUser.email);
      }
    },
    [currentUser]
  );

  let inputData;
  if (!password) {
    inputData = { username, email };
  } else {
    inputData = { username, email, password };
  }

  //update handler
  async function handleUpdateProfile() {
    try {
      setIsLoading(true);
      const res = await fetch(UPDATE_USER_URL, {
        method: "PUT",
        body: JSON.stringify(inputData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const apiData = await res.json();
      dispatch(updateUserSuccess(apiData));
      setIsLoading(false);
      if (apiData.status === "success") {
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error("Update failed");
    }
  }

  //Delete handler
  async function handleDeleteAccount() {
    try {
      setIsLoading(true);
      const res = await fetch(DELETE_USER_URL, {
        method: "POST",
        body: null,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const apiData = await res.json();
      if (apiData.status === "success") {
        toast.success("Account deleted successfully");
        dispatch(deleteUser());
        navigate("/signup");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error("Cannot delete account");
    }
  }

  async function handleLogout() {
    try {
      setIsLoading(true);
      const res = await fetch(LOGOUT_URL, {
        method: "POST",
        body: null,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const apiData = await res.json();
      if (apiData.status === "success") {
        toast.success("Logged out success");
        dispatch(logoutUser());
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
      toast.error("logout failed");
    }
  }
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-xl md:text-3xl text-center font-semibold my-4">
        Profile
      </h1>
      <div className=" grid lg:grid-cols-[1fr,2fr] w-[60%] mx-auto gap-x-5">
        <div className="flex items-center justify-center w-full">
          <img
            src={currentUser.avatar}
            alt="profile-image"
            // width={100}
            // height={100}
            className="rounded-lg lg:w-full w-20 md:w-[130px]"
          />
        </div>
        <div>
          <ul className="space-y-4">
            <li className="flex flex-col gap-2">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                className="p-3 border rounded-lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </li>
            <li className="flex flex-col gap-2">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                className="p-3 border rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </li>
            <li className="flex flex-col gap-2">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="p-3 border rounded-lg"
                defaultValue={currentUser.password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </li>

            <li className="flex items-center gap-4 flex-wrap">
              <button
                className="bg-slate-700 text-white rounded-md p-3  uppercase hover:opacity-70"
                onClick={handleUpdateProfile}
                disabled={isLoading}
              >
                update
              </button>
              <button
                className="bg-red-600 text-white rounded-md p-3  uppercase hover:opacity-70"
                onClick={handleDeleteAccount}
              >
                delete account
              </button>
              <button
                className="bg-red-700 text-white rounded-md p-3  uppercase hover:opacity-70"
                onClick={handleLogout}
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
