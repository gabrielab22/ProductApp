import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  window.addEventListener("storage", () => {
    setToken(localStorage.getItem("token"));
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  return (
    <div className="w-full px-10 bg-teal-600 py-2 border-b-teal-900 border-b-2 flex justify-between items-center  text-teal-100 text-xl">
      <div className="flex justify-center items-center gap-10">
        <Link
          className={`font-bold hover:text-white ${
            location.pathname === "/" ? "text-white underline" : ""
          }`}
          to="/"
        >
          Home
        </Link>
        {token && (
          <>
            <Link
              className={`font-bold hover:text-white ${
                location.pathname.includes("/product")
                  ? "text-white underline"
                  : ""
              }`}
              to="product/all"
            >
              Products
            </Link>

            <Link
              className={`font-bold hover:text-white ${
                location.pathname.includes("/company")
                  ? "text-white underline"
                  : ""
              }`}
              to="company/all"
            >
              Companies
            </Link>
          </>
        )}
      </div>
      {token ? (
        <button
          className="font-bold hover:text-white cursor-pointer"
          onClick={handleLogout}
        >
          Log out
        </button>
      ) : (
        <div className="flex justify-center items-center gap-5">
          <Link
            className={`font-bold hover:text-white ${
              location.pathname === "/login" ? "text-white underline" : ""
            }`}
            to="login"
          >
            Login
          </Link>
          <Link
            className={`font-bold hover:text-white ${
              location.pathname === "/register" ? "text-white underline" : ""
            }`}
            to="register"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
