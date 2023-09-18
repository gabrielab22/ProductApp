import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { Company, Product } from "../../types";
import { useNavigate } from "react-router-dom";

const postProduct = (data: Product): Promise<any> =>
  axios.post("product", data).then((response) => response.data);

const fetchCompanies = (): Promise<Company[]> =>
  axios.get("company/all").then((response) => response.data);

function AddProduct() {
  const navigate = useNavigate();

  const { data: companies } = useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();

  const onSubmit: SubmitHandler<Product> = (data) => {
    mutate(data);
  };

  const { mutate, data } = useMutation({
    mutationFn: (product: Product) => postProduct(product),
    onSuccess: (data) => {
      if (data.name) navigate("/product/all");
    },
    onError: () => alert("Problems"),
  });

  return (
    <>
      <form
        className="flex flex-col rounded border-teal-900 gap-5 border-2 p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="font-bold text-2xl">Add Product</h2>
        <div className="flex flex-col">
          <label>Name:</label>
          <input
            className="border-teal-900 p-2 border-2 rounded bg-teal-100"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-700">This field is required</span>
          )}
        </div>
        <div className="flex flex-col">
          <label>Price:</label>
          <input
            type="number"
            className="border-teal-900 p-2 border-2 rounded bg-teal-100"
            {...register("price", { required: true })}
          />
          {errors.price && (
            <span className="text-red-700">This field is required</span>
          )}
        </div>

        <div className="flex flex-col">
          <label>Type:</label>
          <input
            className="border-teal-900 p-2 border-2 rounded bg-teal-100"
            {...register("type", { required: true })}
          />
          {errors.type && (
            <span className="text-red-700">This field is required</span>
          )}
        </div>

        <div className="flex flex-col">
          <label>Availability:</label>
          <input
            type="number"
            className="border-teal-900 p-2 border-2 rounded bg-teal-100"
            {...register("availability", { required: true })}
          />
          {errors.availability && (
            <span className="text-red-700">This field is required</span>
          )}
        </div>

        <div className="flex flex-col">
          <label>Company:</label>
          <select
            className="border-teal-900 p-2 border-2 rounded bg-teal-100 cursor-pointer"
            {...register("companyId")}
          >
            {companies?.map((company) => (
              <option
                key={company.id}
                className="cursor-pointer border-2 border-teal-900"
                value={company.id}
              >
                {company.name}
              </option>
            ))}
          </select>

          {errors.companyId && (
            <span className="text-red-700">This field is required</span>
          )}
        </div>

        <input
          className="bg-teal-900 font-bold text-white rounded w-32 p-2 ml-auto cursor-pointer hover:scale-105 transition"
          type="submit"
        />
      </form>
    </>
  );
}

export default AddProduct;
