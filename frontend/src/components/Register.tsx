import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { User, RegistrationCredentials } from "../types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const postRegistration = (data: RegistrationCredentials): Promise<User> =>
  axios.post("register", data).then((response) => response.data);

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationCredentials>();
  const onSubmit: SubmitHandler<RegistrationCredentials> = (data) => {
    mutate(data);
  };

  const { mutate, data } = useMutation({
    mutationFn: (loginCreds: RegistrationCredentials) =>
      postRegistration(loginCreds),
    onSuccess: (data) => {
      if (data.id) {
        alert("User creation success!!");
        navigate("/login");
      } else alert(JSON.stringify(data));
    },
  });

  return (
    <>
      <form
        className="flex flex-col rounded border-teal-900 gap-5 border-2 p-5 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label>Email:</label>
          <input
            className="border-teal-900 p-2 border-2 rounded bg-teal-100"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-700">This field is required</span>
          )}
        </div>
        <div className="flex flex-col">
          <label>Password:</label>
          <input
            className="border-teal-900 p-2 border-2 rounded bg-teal-100"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-700">This field is required</span>
          )}
        </div>

        <div className="flex flex-col">
          <label>First Name:</label>
          <input
            className="border-teal-900 p-2 border-2 rounded bg-teal-100"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <span className="text-red-700">This field is required</span>
          )}
        </div>
        <div className="flex flex-col">
          <label>Last Name:</label>
          <input
            className="border-teal-900 p-2 border-2 rounded bg-teal-100"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            <span className="text-red-700">This field is required</span>
          )}
        </div>

        <input
          className="bg-teal-900 font-bold text-white rounded w-32 p-2 ml-auto cursor-pointer hover:scale-105 active:scale-95 transition"
          type="submit"
        />
      </form>
    </>
  );
}

export default Register;
