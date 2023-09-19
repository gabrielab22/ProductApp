import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "../../types";
import { Link } from "react-router-dom";
import { useState } from "react";

const fetchProducts = (): Promise<Product[]> =>
  axios.get("product/all").then((response) => response.data);

function Products() {
  const [isAdmin, setIsAdmin] = useState<boolean>(
    localStorage.getItem("isAdmin") === "true"
  );
  window.addEventListener("storage", () => {
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  });
  const { isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <div className="flex flex-col gap-5">
      {isAdmin && (
        <Link
          to={`../add`}
          className="bg-teal-900 font-bold text-white rounded p-2 ml-auto cursor-pointer hover:scale-105 transition"
        >
          + Add Product
        </Link>
      )}
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="flex gap-3 flex-col">
          {data?.map((product) => (
            <Link
              key={product.id}
              to={`../details/${product.id}`}
              className="w-full border-teal-900 border-2 p-3 rounded bg-teal-100 flex justify-between hover:scale-105 transition cursor-pointer"
            >
              <div className="font-bold">{product.name}</div>
              <div className="">Price: {product.price}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
