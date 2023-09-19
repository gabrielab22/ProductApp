import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { Company } from "../../types";
import { useNavigate } from "react-router-dom";

const postCompany = (data: Company): Promise<any> =>
  axios.post("company", data).then((response) => response.data);

function AddCompany() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Company>();
  const onSubmit: SubmitHandler<Company> = (data) => {
    mutate(data);
  };

  const { mutate, data } = useMutation({
    mutationFn: (company: Company) => postCompany(company),
    onSuccess: (data) => {
      if (data.name) navigate("/company/all");
    },
    onError: () => alert("Problems"),
  });

  return (
    <form
      className="flex flex-col rounded border-teal-900 gap-5 border-2 p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="font-bold text-2xl">Add company</h2>
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
        <label>Country:</label>
        <input
          className="border-teal-900 p-2 border-2 rounded bg-teal-100"
          {...register("country", { required: true })}
        />
        {errors.country && (
          <span className="text-red-700">This field is required</span>
        )}
      </div>

      <div className="flex flex-col">
        <label>Birth:</label>
        <input
          type="number"
          className="border-teal-900 p-2 border-2 rounded bg-teal-100"
          {...register("birth", { required: true })}
        />
        {errors.birth && (
          <span className="text-red-700">This field is required</span>
        )}
      </div>

      <div className="flex flex-col">
        <label>Employee:</label>
        <input
          type="number"
          className="border-teal-900 p-2 border-2 rounded bg-teal-100"
          {...register("employee", { required: true })}
        />
        {errors.employee && (
          <span className="text-red-700">This field is required</span>
        )}
      </div>

      <input
        className="bg-teal-900 font-bold text-white rounded w-32 p-2 ml-auto cursor-pointer hover:scale-105 transition"
        type="submit"
      />
    </form>
  );
}

export default AddCompany;
