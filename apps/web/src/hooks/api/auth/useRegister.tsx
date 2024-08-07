"use client"

import useAxios from "@/hooks/useAxios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface RegisterArgs {
  name: string,
  email: string,
  password: string,
}

const useRegister = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {axiosInstance} = useAxios();

  const register = async (payload: RegisterArgs) => {
    setIsLoading(true);
    try {
      await axiosInstance.post("/api/auth/register", {
        name: payload.name,
        email: payload.email,
        password: payload.password,
      });

      alert("Register Success");
      router.push("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data);
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return {
    register, isLoading
  };
};

export default useRegister;