import { baseUrl } from "@/helpers";
import {
    UseMutationOptions,
    UseMutationResult,
    useMutation,
} from "@tanstack/react-query";
import axios from "axios";

export type AdminRefreshTokenData = {
  refreshToken: string;
};

export type AdminRefreshTokenResponse = {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
  };
  timestamp: string;
};

export function useAdminRefreshToken(
  options?: UseMutationOptions<AdminRefreshTokenResponse, unknown, AdminRefreshTokenData, unknown>
): UseMutationResult<AdminRefreshTokenResponse, unknown, AdminRefreshTokenData, unknown> {
  return useMutation(
    (data: AdminRefreshTokenData) =>
      axios
        .post(`${baseUrl}/admin/auth/refresh-token`, data, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data),
    options
  );
}


