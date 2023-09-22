import { Product } from "../../types";
import { Link } from "react-router-dom";

function ProductsResults({
  products,
  isLoading,
}: {
  products: Product[];
  isLoading: boolean;
}) {
  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="flex gap-3 flex-col">
          {products?.map((product) => (
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
    </>
  );
}

export default ProductsResults;
