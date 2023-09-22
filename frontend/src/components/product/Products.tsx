import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Company, Product } from "../../types";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const fetchProducts = (): Promise<Product[]> =>
  axios.get("product/all").then((response) => response.data);

const fetchCompanies = (): Promise<Company[]> =>
  axios.get("company/all").then((response) => response.data);

function Products() {
  const [productsToShow, setProductsToShow] = useState<Product[]>([]);
  const [filters, setFilters] = useState<{
    companyId: string;
    priceMin: number;
    priceMax: number;
  }>({
    companyId: "*",
    priceMin: 0,
    priceMax: 99999999999999,
  });
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
  const { data: companies } = useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
  });

  const handleFilter = () => {
    let productsToFilter = data;
    console.log(filters);

    if (filters.companyId === "*") setProductsToShow(data!);
    else
      productsToFilter = productsToFilter!.filter(
        (product) => product.companyId === Number(filters.companyId)
      );
    productsToFilter = productsToFilter?.filter(
      (product) => product.price > filters.priceMin
    );
    productsToFilter = productsToFilter?.filter(
      (product) => product.price < filters.priceMax
    );

    setProductsToShow(productsToFilter!);
  };

  useEffect(() => {
    setProductsToShow(data!);
  }, [data]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2 p-5 border-dashed border-teal-500 border-2">
        Filter by country:
        <select
          onChange={(e) =>
            setFilters({ ...filters, companyId: e.target.value })
          }
          className="border-2 rounded border-teal-900 p-1"
        >
          <option value={"*"}>*</option>
          {companies?.map((company, key) => (
            <option value={company.id}>{company.name}</option>
          ))}
        </select>
        Price Min:
        <input
          type="number"
          defaultValue={filters.priceMin}
          className="border-2 rounded border-teal-900 p-1"
          onChange={(e) =>
            setFilters({ ...filters, priceMin: Number(e.target.value) })
          }
        />
        Price Max:
        <input
          type="number"
          defaultValue={filters.priceMax}
          className="border-2 rounded border-teal-900 p-1"
          onChange={(e) =>
            setFilters({ ...filters, priceMax: Number(e.target.value) })
          }
        />
        <button
          className="bg-teal-500 m-4 font-bold text-white rounded w-32 p-2 ml-auto cursor-pointer hover:scale-105 transition"
          onClick={() => handleFilter()}
        >
          Apply Filters
        </button>
      </div>
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
          {productsToShow?.map((product) => (
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
