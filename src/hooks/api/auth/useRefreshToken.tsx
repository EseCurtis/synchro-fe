import { baseUrl } from "@/helpers";
import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
} from "@tanstack/react-query";
import axios from "axios";

export type RefreshTokenData = {
  refreshToken: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export function useRefreshToken(
  options?: UseMutationOptions<RefreshTokenResponse, unknown, RefreshTokenData, unknown>
): UseMutationResult<RefreshTokenResponse, unknown, RefreshTokenData, unknown> {
  return useMutation(
    (data: RefreshTokenData) =>
      axios
        .post(`${baseUrl}/auth/refresh-token`, data, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data),
    options
  );
}
