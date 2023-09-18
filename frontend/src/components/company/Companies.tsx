import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { Company } from "../../types";
import { useState } from "react";

const fetchCompanies = (): Promise<Company[]> =>
  axios.get("company/all").then((response) => response.data);

function Companies() {
  const [isAdmin, setIsAdmin] = useState<boolean>(
    localStorage.getItem("isAdmin") === "true"
  );
  window.addEventListener("storage", () => {
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  });

  const { isLoading, data } = useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
  });

  return (
    <div className="flex flex-col gap-5">
      {isAdmin && (
        <Link
          to={`../add`}
          className="bg-teal-900 font-bold text-white rounded  p-2 ml-auto cursor-pointer hover:scale-105 transition"
        >
          + Add Company
        </Link>
      )}
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="flex gap-3 flex-col">
          {data?.map((company) => (
            <Link
              key={company.id}
              to={`../details/${company.id}`}
              className="w-full border-teal-900 border-2 p-3 rounded bg-teal-100 flex justify-between hover:scale-105 transition cursor-pointer"
            >
              <div className="font-bold">{company.name}</div>
              <div className="">Country: {company.country}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Companies;
