import { useParams } from "react-router-dom";

function AddProduct() {
  let params = useParams();

  return (
    <div>
      AddProduct
      {params.id}
    </div>
  );
}

export default AddProduct;
