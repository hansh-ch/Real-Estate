import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../slices/userSlice";

export default function OAuth() {
  const dispatch = useDispatch();
  async function handleOAuth() {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const res = await fetch(`${BASE_URL}/auth/google`, {
        method: "POST",
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
    } catch (error) {
      console.log("Could not sign with google");
    }
  }
  return (
    <button
      className="bg-red-700 text-white uppercase p-3 rounded-lg hover:opacity-70 w-full mt-2"
      onClick={handleOAuth}
    >
      Continue with google
    </button>
  );
}
