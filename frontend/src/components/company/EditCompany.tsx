import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Company } from "../../types";
import { SubmitHandler, useForm } from "react-hook-form";

const fetchCompany = (id: string): Promise<Company> =>
  axios.get("company/" + id).then((response) => response.data);

const putCompany = (company: Company, companyId?: number): Promise<Company> =>
  axios
    .put("company/update/" + companyId, company)
    .then((response) => response.data);

function EditCompany() {
  let params = useParams();
  const navigate = useNavigate();

  const { data: company } = useQuery({
    queryKey: ["company"],
    queryFn: () => fetchCompany(params.id!),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Company>();
  const onSubmit: SubmitHandler<Company> = (data) => {
    mutate(data);
  };

  const { mutate } = useMutation({
    mutationFn: (data: Company) => putCompany(data, company?.id),
    onSuccess: () => {
      navigate(`/company/details/${company?.id}`);
    },
    onError: () => alert("Problems"),
  });

  return (
    <form
      className="flex flex-col rounded border-teal-900 gap-5 border-2 p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="font-bold text-2xl">Edit company</h2>
      <div className="flex flex-col">
        <label>Name:</label>
        <input
          defaultValue={company?.name}
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
          defaultValue={company?.country}
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
          defaultValue={company?.birth}
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
          defaultValue={company?.employee}
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

export default EditCompany;
