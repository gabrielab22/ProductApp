import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Product } from "../../types";
import { useState } from "react";

const fetchProduct = (id: string): Promise<Product> =>
  axios.get("product/" + id).then((response) => response.data);

function ProductDetails() {
  const [isAdmin, setIsAdmin] = useState<boolean>(
    localStorage.getItem("isAdmin") === "true"
  );
  window.addEventListener("storage", () => {
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  });

  let params = useParams();

  const { data } = useQuery({
    queryKey: ["product"],
    queryFn: () => fetchProduct(params.id!),
  });

  return (
    <div className="w-full border-teal-900 border-2 p-3 rounded bg-teal-100 flex-col">
      <div className="flex flex-row justify-between mb-4 p-2 border-b-2 border-teal-900">
        <div className="font-bold text-2xl">Product Details</div>
        {isAdmin && (
          <Link
            to={`../edit/${params.id}`}
            className="bg-teal-900 font-bold text-white rounded p-2 ml-auto cursor-pointer hover:scale-105 transition"
          >
            Edit
          </Link>
        )}
      </div>
      <div>
        <span className="font-bold">Name: </span> {data?.name}
      </div>
      <div>
        <span className="font-bold">ID: </span> {data?.id}
      </div>
      <div>
        <span className="font-bold">CompanyId: </span> {data?.companyId}
      </div>
      <div>
        <span className="font-bold">Availability: </span> {data?.availability}
      </div>
      <div>
        <span className="font-bold">Price: </span> {data?.price}
      </div>
      <div>
        <span className="font-bold">Type: </span> {data?.type}
      </div>
    </div>
  );
}

export default ProductDetails;
