import {
    UseMutationOptions,
    UseMutationResult,
    UseQueryOptions,
    UseQueryResult,
} from "@tanstack/react-query";
import { usePaginatedQuery } from "../usePaginatedQuery";
import { useTQuery } from "../useTQuery";

export type AdminUser = {
  id: string;
  email: string;
  role: string;
  isAdmin: boolean;
  adminPermissions?: string[];
  status: string;
  createdAt: Date;
  lastLoginAt?: Date;
};

export type CreateAdminData = {
  email: string;
  password: string;
  role?: string;
  permissions?: string[];
  phoneNumber?: string;
};

export type UpdateAdminRoleData = {
  role: string;
  permissions?: string[];
};

export type UpdateAdminPermissionsData = {
  permissions: string[];
};

// Get all admin users
export function useGetAdminUsers(
  options?: UseQueryOptions<any, any, any, string[]>
): UseQueryResult<any, unknown> {
  return usePaginatedQuery({
    queryKey: ["admin-users"],
    url: "/admin/management/admins",
    options,
  });
}

// Create new admin user
export function useCreateAdminUser(
  options?: UseMutationOptions<any, unknown, CreateAdminData, unknown>
): UseMutationResult<any, unknown, CreateAdminData, unknown> {
  return useTQuery({
    queryKey: ["create-admin-user"],
    url: "/admin/management/admins",
    method: "post",
    options,
  });
}

// Update admin role
export function useUpdateAdminRole(
  options?: UseMutationOptions<any, unknown, { adminId: string; data: UpdateAdminRoleData }, unknown>
): UseMutationResult<any, unknown, { adminId: string; data: UpdateAdminRoleData }, unknown> {
  return useTQuery({
    queryKey: ["update-admin-role"],
    url: "/admin/management/admins/:adminId/role",
    method: "put",
    options,
  });
}

// Update admin permissions
export function useUpdateAdminPermissions(
  options?: UseMutationOptions<any, unknown, { adminId: string; data: UpdateAdminPermissionsData }, unknown>
): UseMutationResult<any, unknown, { adminId: string; data: UpdateAdminPermissionsData }, unknown> {
  return useTQuery({
    queryKey: ["update-admin-permissions"],
    url: "/admin/management/admins/:adminId/permissions",
    method: "put",
    options,
  });
}

// Deactivate admin user
export function useDeactivateAdminUser(
  options?: UseMutationOptions<any, unknown, string, unknown>
): UseMutationResult<any, unknown, string, unknown> {
  return useTQuery({
    queryKey: ["deactivate-admin-user"],
    url: "/admin/management/admins/:adminId",
    method: "delete",
    options,
  });
}

// Get available permissions
export function useGetAvailablePermissions(
  options?: UseQueryOptions<any, any, any, string[]>
): UseQueryResult<any, unknown> {
  return useTQuery({
    queryKey: ["available-permissions"],
    url: "/admin/management/permissions",
    options,
  });
}

// Get admin dashboard stats
export function useGetAdminStats(
  options?: UseQueryOptions<any, any, any, string[]>
): UseQueryResult<any, unknown> {
  return useTQuery({
    queryKey: ["admin-stats"],
    url: "/admin/management/stats",
    options,
  });
}

