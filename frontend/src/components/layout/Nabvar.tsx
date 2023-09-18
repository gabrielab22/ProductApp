import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-full bg-teal-600 py-2 border-b-teal-900 flex justify-center items-center gap-10">
      <Link className="font-bold hover:text-white text-teal-300 text-xl" to="/">
        Home
      </Link>
      <Link
        className="font-bold hover:text-white text-teal-300 text-xl"
        to="product/all"
      >
        Products
      </Link>
      <Link
        className="font-bold hover:text-white text-teal-300 text-xl"
        to="company/all"
      >
        Companies
      </Link>
    </div>
  );
}

export default Navbar;
