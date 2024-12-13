import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md flex items-center justify-between max-w-6xl mx-auto p-3">
      <h1 className="font-bol text-sm md:text-xl flex flex-wrap">
        <Link to="/">
          <span className="text-slate-400">Realfy</span>
          <span className="text-slate-700">Estate</span>
        </Link>
      </h1>
      <form className="bg-slate-100 p-3 rounded-lg flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none w-24 sm:w-64"
        />
        <FaSearch className="text-slate-300" />
      </form>
      <ul className="hidden md:flex gap-4 items-center mr-3">
        <li className="text-slate-700 hover:underline transition-all duration-200">
          <Link to="/">Home</Link>
        </li>
        <li className="text-slate-700 hover:underline transition-all duration-200">
          <Link to="/about">About</Link>
        </li>
        <li className="text-slate-700 hover:underline transition-all duration-200">
          <Link to="/signin">Signin</Link>
        </li>
      </ul>
      <ul className="inline md:hidden">
        <li className="text-slate-700 hover:underline transition-all duration-200">
          <Link to="/signin">Signin</Link>
        </li>
      </ul>
    </header>
  );
}
