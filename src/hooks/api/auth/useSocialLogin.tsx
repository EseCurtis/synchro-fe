import { baseUrl } from "@/helpers";
import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
} from "@tanstack/react-query";
import axios from "axios";

export type SocialLoginData = {
  provider: "google" | "apple" | "facebook";
  idToken: string;
  pushToken?: string;
  clientIp?: string;
};

export type SocialLoginResponse = {
  success: boolean;
  message: string;
  data: {
    user: any;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
    profile: any;
  };
  timestamp: string;
};

export function useSocialLogin(
  options?: UseMutationOptions<SocialLoginResponse, unknown, SocialLoginData, unknown>
): UseMutationResult<SocialLoginResponse, unknown, SocialLoginData, unknown> {
  return useMutation(
    (data: SocialLoginData) =>
      axios
        .post(`${baseUrl}/auth/social-login`, data, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data),
    options
  );
}
