import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SIGNIN_URL } from "../utils/constants";
import { toast } from "react-toastify";
import { signInStart, signInSuccess, signInFail } from "../slices/userSlice";
import OAuth from "../components/OAuth";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.user);

  async function handleSubmit() {
    try {
      dispatch(signInStart());
      const data = { email, password };
      const res = await fetch(SIGNIN_URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const apiData = await res.json();
      if (apiData.status === "fail") {
        dispatch(signInFail(apiData.message));
        toast.error(apiData.message);
        return;
      }
      dispatch(signInSuccess(apiData));
      // navigate("/signin");
    } catch (error) {
      dispatch(signInFail(error.message));
      return;
    }
  }
  return (
    <div className="flex justify-center items-center">
      <div className="p-4 w-[35%] mx-auto bg-slate-200 rounded-md shadow-md mt-4">
        <div className="text-center space-y-2">
          <h2 className="text-xl md:text-3xl">Sign In</h2>
        </div>
        <ul className="mt-2 space-y-2">
          <li className="flex flex-col gap-2 ">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              className="p-3 border rounded-lg"
              id="email"
              placeholder="e.g. user@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li className="flex flex-col gap-2">
            <label htmlFor="password">Password:</label>
            <input
              type="text"
              className="p-3 border rounded-lg"
              id="password"
              placeholder="e.g. user123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
        </ul>
        <div className="mt-2">
          <button
            className="w-full px-2 py-3 outline-none bg-slate-700 text-white rounded-lg uppercase hover:opacity-80 disabled:opacity-50"
            onClick={handleSubmit}
          >
            Sign In
          </button>
          <OAuth />
        </div>
        <div className="mt-2 text-center">
          <p>
            Don't have an account ?
            <span className="text-purple-800">
              <Link to="/signup">Signup</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
