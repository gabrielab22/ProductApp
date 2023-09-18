import { useParams } from "react-router-dom";

function ProductDetails() {
  let params = useParams();

  return <div>Product Details{params.id}</div>;
}

export default ProductDetails;
