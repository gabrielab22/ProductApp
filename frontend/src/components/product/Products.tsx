import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Company, Product } from "../../types";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductsResults from "./ProductsResult";
import ProductsFilters from "./ProductsFilters";

const fetchProducts = (): Promise<Product[]> =>
  axios.get("product/all").then((response) => response.data);

function Products() {
  const [productsToShow, setProductsToShow] = useState<Product[]>([]);

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

  useEffect(() => {
    setProductsToShow(data!);
  }, [data]);

  return (
    <div className="flex flex-col gap-5">
      <ProductsFilters products={data!} setProductsToShow={setProductsToShow} />
      {isAdmin && (
        <Link
          to={`../add`}
          className="bg-teal-900 font-bold text-white rounded p-2 ml-auto cursor-pointer hover:scale-105 transition"
        >
          + Add Product
        </Link>
      )}

      <ProductsResults products={productsToShow} isLoading={isLoading} />
    </div>
  );
}

export default Products;
