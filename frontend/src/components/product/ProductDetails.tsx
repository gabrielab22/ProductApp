import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Product } from "../../types";

const fetchProduct = (id: string): Promise<Product> =>
  axios.get("product/" + id).then((response) => response.data);

function ProductDetails() {
  let params = useParams();

  const { data } = useQuery({
    queryKey: ["product"],
    queryFn: () => fetchProduct(params.id!),
  });

  return (
    <div className="w-full border-teal-900 border-2 p-3 rounded bg-teal-100 flex-col">
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
