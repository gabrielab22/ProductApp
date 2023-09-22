import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Company, Product } from "../../types";

import { useState } from "react";

const fetchCompanies = (): Promise<Company[]> =>
  axios.get("company/all").then((response) => response.data);

function ProductsFilters({
  setProductsToShow,
  products,
}: {
  setProductsToShow: (productsToSet: Product[]) => void;
  products: Product[];
}) {
  const [filters, setFilters] = useState<{
    companyId: string;
    priceMin: number;
    priceMax: number;
  }>({
    companyId: "*",
    priceMin: 0,
    priceMax: 99999999999999,
  });

  const { data: companies } = useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
  });

  const handleFilter = () => {
    let productsToFilter = products;

    if (filters.companyId !== "*")
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

  return (
    <div className="flex flex-col gap-2 p-5 border-dashed border-teal-500 border">
      Filter by company:
      <select
        onChange={(e) => setFilters({ ...filters, companyId: e.target.value })}
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
        className="border-2 rounded border-teal-900 p-1"
        onChange={(e) =>
          setFilters({ ...filters, priceMin: Number(e.target.value) })
        }
      />
      Price Max:
      <input
        type="number"
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
  );
}

export default ProductsFilters;
