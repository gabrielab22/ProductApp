import { useParams } from "react-router-dom";

function AddCompany() {
  let params = useParams();

  return <div>AddCompany{params.id}</div>;
}

export default AddCompany;
