import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-full px-10 bg-teal-600 py-2 border-b-teal-900 border-b-2 flex justify-between items-center  text-teal-100 text-xl">
      <div className="flex justify-center items-center gap-10">
        <Link className="font-bold hover:text-white" to="/">
          Home
        </Link>
        <Link className="font-bold hover:text-white" to="product/all">
          Products
        </Link>
        <Link className="font-bold hover:text-white" to="company/all">
          Companies
        </Link>
      </div>
      <div className="flex justify-center items-center gap-5">
        <Link className="font-bold hover:text-white" to="login">
          Login
        </Link>
        <Link className="font-bold hover:text-white" to="register">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
