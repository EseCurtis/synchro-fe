import {
    UseMutationOptions,
    UseMutationResult,
} from "@tanstack/react-query";
import { useTMutation } from "../useTMutation";

export type AdminChangePasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export function useAdminChangePassword(
  options?: UseMutationOptions<any, unknown, AdminChangePasswordData, unknown>
): UseMutationResult<any, unknown, AdminChangePasswordData, unknown> {
  return useTMutation({
    url: "/admin/auth/change-password",
    method: "put",
    options,
  });
}
