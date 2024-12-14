import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex justify-center items-center">
      <div className="p-4 w-[35%] mx-auto bg-slate-200 rounded-md shadow-md mt-4">
        <div className="text-center space-y-2">
          <h2 className="text-xl md:text-3xl">Sign Up</h2>
          <p className="text-sm md:text-xl">Create your account</p>
        </div>
        <ul className="mt-2 space-y-2">
          <li className="flex flex-col gap-2">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              className="p-3 border rounded-lg"
              placeholder="e.g. user100"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </li>
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
          <button className="w-full px-2 py-3 outline-none bg-slate-700 text-white rounded-lg uppercase hover:opacity-80 disabled:opacity-50">
            Sign Up
          </button>
        </div>
        <div className="mt-2 text-center">
          <p>
            Already have an account ?{" "}
            <span className="text-purple-800">
              <Link to="/signin">Signin</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
