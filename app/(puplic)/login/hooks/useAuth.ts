import { useMutation } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { CookieManager } from "@/lib/cookieUtils";
import { useRouter } from "next/navigation";
import { LoginPayload, LoginResponse } from "@/types/auth";

export function useLogin() {
  const router = useRouter();

  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: async (payload: LoginPayload) => {
      // We tell axios to expect LoginResponse
      const { data } = await api.post<LoginResponse>("login", payload);
      return data;
    },
    onSuccess: (data) => {
      // Now TypeScript knows 'status' exists on 'data'
      if (data.status === "success") {
        CookieManager.set("token", data.token);
        CookieManager.set("user", JSON.stringify(data.user));
        CookieManager.set("access", JSON.stringify(data.dropdown_access));
        router.push("/salesDashboard");
      }
    },
  });
}
