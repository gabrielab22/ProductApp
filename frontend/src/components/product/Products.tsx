import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "../../types";
import { Link } from "react-router-dom";

const fetchProducts = (): Promise<Product[]> =>
  axios.get("product/all").then((response) => response.data);

function Products() {
  const { isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <div>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="flex gap-3 flex-col">
          {data?.map((product) => (
            <Link
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
