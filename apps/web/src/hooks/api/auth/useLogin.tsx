"use client";

import useAxios from "@/hooks/useAxios";
import { useAppDispatch } from "@/redux/hooks";
import { loginAction } from "@/redux/slices/userSlice";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface LoginPayload {
  email: string;
  password: string;
}

// const useLogin = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const {axiosInstance} = useAxios();

//   const login = async (payload: LoginPayload) => {
//     setIsLoading(true);
//     try {
//       const { data } = await axiosInstance.post("/api/auth/login", payload);
//       dispatch(loginAction(data));
//       toast("Login Success", { position: "top-left" });

//       router.push("/");
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         toast.error(error.response?.data || "Something went wrong");
//       }
//       console.log(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { login, isLoading };
// };

// export default useLogin;

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await axiosInstance.post("/api/auth/login", payload);
      return data;
    },
    onSuccess: (data) => {
      dispatch(loginAction(data));
      toast.success("Login success");
      router.replace("/");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useLogin;