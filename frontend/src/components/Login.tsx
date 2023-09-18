import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LoginCredentials, LoginResponse } from "../types";

const fetchProduct = (data: LoginCredentials): Promise<LoginResponse> =>
  axios.post("login", { body: data }).then((response) => response.data);

function Login() {
  const { mutate, data } = useMutation({
    mutationFn: (loginCreds: LoginCredentials) => fetchProduct(loginCreds),
  });

  return (
    <div className="w-full border-teal-900 border-2 p-3 rounded bg-teal-100 flex-col"></div>
  );
}

export default Login;
