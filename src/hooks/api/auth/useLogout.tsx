import {
    UseMutationOptions,
    UseMutationResult
} from "@tanstack/react-query";
import { useTQuery } from "../useTQuery";

export function useLogout(
  options?: UseMutationOptions<any, unknown, void, unknown>
): UseMutationResult<any, unknown, void, unknown> {
  return useTQuery({
    queryKey: ["logout"],
    url: "/admin/auth/logout",
    method: "post",
    options,
  });
}
