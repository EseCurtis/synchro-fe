import { baseUrl } from "@/helpers";
import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
    UseQueryOptions,
    UseQueryResult,
} from "@tanstack/react-query";
import axios from "axios";
import { useTQuery } from "../useTQuery";

export function useGetUserWithoutContext(
  options?: UseMutationOptions<any, unknown, any, unknown>
): UseMutationResult<unknown, unknown, any, unknown> {
  // Using a useMutation as opposed to useQuery for this GET request so
  // it can be invoked by "mutate" only when needed
  return useMutation(
    (accessToken: string) =>
      axios
        .get(`${baseUrl}/user/admin/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data),
    options
  );
}

export function useGetCurrentUser(
  options?: UseQueryOptions<any, any, any, string[]>
): UseQueryResult<any, unknown> {
  // Using a useMutation as opposed to useQuery for this GET request so
  // it can be invoked by "mutate" only when needed
  return useTQuery({
    queryKey: ["user"],
    url: "/admin/users/me",
    options,
  });
}
