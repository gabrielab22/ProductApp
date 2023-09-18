import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-full bg-teal-600 py-2 border-b-teal-900 border-b-2 flex justify-center items-center gap-10 text-teal-100 text-xl">
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
  );
}

export default Navbar;
