import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Company } from "../../types";
import { useState } from "react";

const fetchProduct = (id: string): Promise<Company> =>
  axios.get("company/" + id).then((response) => response.data);

function CompanyDetails() {
  const [isAdmin, setIsAdmin] = useState<boolean>(
    localStorage.getItem("isAdmin") === "true"
  );
  window.addEventListener("storage", () => {
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  });

  let params = useParams();

  const { data } = useQuery({
    queryKey: ["company"],
    queryFn: () => fetchProduct(params.id!),
  });

  return (
    <div className="w-full border-teal-900 border-2 p-3 rounded bg-teal-100 flex-col">
      <div className="flex flex-row justify-between mb-4 border-b-2 p-2 border-teal-900">
        <div className="font-bold text-2xl">Company Details</div>
        {isAdmin && (
          <Link
            to=""
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
        <span className="font-bold">Id: </span> {data?.id}
      </div>
      <div>
        <span className="font-bold">Birth: </span> {data?.birth}
      </div>
      <div>
        <span className="font-bold">Country: </span> {data?.country}
      </div>
      <div>
        <span className="font-bold">Employee: </span> {data?.employee}
      </div>
    </div>
  );
}

export default CompanyDetails;
