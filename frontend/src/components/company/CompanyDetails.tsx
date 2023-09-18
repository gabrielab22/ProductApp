import { useParams } from "react-router-dom";

function CompanyDetails() {
  let params = useParams();

  return <div>Company details{params.id}</div>;
}

export default CompanyDetails;
