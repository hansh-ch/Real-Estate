import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UPDATE_USER_URL } from "../utils/constants";
import { toast } from "react-toastify";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const data = { username, email, password };
  //update handler
  async function handleUpdateProfile() {
    try {
      const res = await fetch(UPDATE_USER_URL, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const apiData = await res.json();
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
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
                type="text"
                className="p-3 border rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </li>

            <li className="flex items-center gap-4 flex-wrap">
              <button
                className="bg-slate-700 text-white rounded-md p-3  uppercase hover:opacity-70"
                onClick={handleUpdateProfile}
              >
                update
              </button>
              <button className="bg-red-600 text-white rounded-md p-3  uppercase hover:opacity-70">
                delete account
              </button>
              <button className="bg-red-700 text-white rounded-md p-3  uppercase hover:opacity-70">
                Sign out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    // <div className="max-w-6xl mx-auto ">
    //   <h1 className="text-xl md:text-3xl text-center font-semibold my-4">
    //     Profile
    //   </h1>
    //   <div>
    //     <ul className="max-w-[40%] mx-auto space-y-4">
    //       <div className="flex items-center justify-center">
    //         <img
    //           src={currentUser.avatar}
    //           alt="profile-image"
    //           width={100}
    //           height={100}
    //           className="rounded-full"
    //         />
    //       </div>
    //       <li className="flex flex-col gap-2">
    //         <label htmlFor="username">Username:</label>
    //         <input
    //           type="text"
    //           className="p-3 border rounded-lg"
    //           value={currentUser.username}
    //           onChange={(e) => setUsername(e.target.value)}
    //         />
    //       </li>
    //       <li className="flex flex-col gap-2">
    //         <label htmlFor="email">Email:</label>
    //         <input
    //           type="text"
    //           className="p-3 border rounded-lg"
    //           value={currentUser.email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //       </li>
    //       <li>
    //         <button className="bg-slate-700 text-white rounded-md p-3  uppercase hover:opacity-70">
    //           update
    //         </button>
    //       </li>
    //       <div className="flex items-center justify-between">
    //         <span className="text-red-700 cursor-pointer p-3">
    //           Delete Account
    //         </span>
    //         <span className="text-red-700 cursor-pointer p-3">Log Out</span>
    //       </div>
    //     </ul>
    //   </div>
    // </div>
  );
}
