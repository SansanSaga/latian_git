"use client";

import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const useResetPassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = async (password: string, token: string) => {
    setIsLoading(true);
    try {
      await axiosInstance.patch(
        "/api/auth/reset-password",
        {
          password,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast("Reset password success");
      router.push("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data || "Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return {
    resetPassword,
    isLoading,
  };
};

export default useResetPassword;
