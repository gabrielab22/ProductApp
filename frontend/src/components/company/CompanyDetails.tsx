import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Company } from "../../types";

const fetchProduct = (id: string): Promise<Company> =>
  axios.get("company/" + id).then((response) => response.data);

function CompanyDetails() {
  let params = useParams();

  const { data } = useQuery({
    queryKey: ["company"],
    queryFn: () => fetchProduct(params.id!),
  });

  return (
    <div className="w-full border-teal-900 border-2 p-3 rounded bg-teal-100 flex-col">
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
