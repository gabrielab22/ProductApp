import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { LoginCredentials, LoginResponse } from "../types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const postLogin = (data: LoginCredentials): Promise<LoginResponse> =>
  axios.post("login", data).then((response) => response.data);

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();
  const onSubmit: SubmitHandler<LoginCredentials> = (data) => {
    mutate(data);
  };

  const { mutate, data } = useMutation({
    mutationFn: (loginCreds: LoginCredentials) => postLogin(loginCreds),
    onSuccess: (data) => {
      if ((data.message = "success")) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isAdmin", data.isAdmin.toString());
        window.dispatchEvent(new Event("storage"));
      }
      navigate("/product/all");
    },
    onError: () => alert("Email and password don't match."),
  });

  return (
    <>
      <form
        className="flex flex-col rounded border-teal-900 gap-5 border-2 p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label>Email:</label>
          <input
            defaultValue="gabriela@email.com"
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
            defaultValue="test123"
            className="border-teal-900 p-2 border-2 rounded bg-teal-100"
            {...register("password", { required: true })}
          />
          {errors.password && (
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

export default Login;
