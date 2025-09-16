"use client";
import { AppToast } from "@/app/_components/AppToast";
import { AdminRouteGuard } from "@/app/_components/auth/AdminRouteGuard";
import { Button } from "@/app/_components/button";
import Input from "@/app/_components/input_fields";
import Modal from "@/app/_components/popups/modal";
import DefaultTable from "@/app/_components/table/defaultTable";
import { useAuthContext } from "@/contexts/AuthContext";
import {
    useCreateAdminUser, useDeactivateAdminUser,
    useGetAdminUsers,
    useGetAvailablePermissions
} from "@/hooks/api/auth/useAdminManagement";
import { useFormik } from "formik";
import { useState } from "react";
import { array, object, string } from "yup";

export default function AdminManagementPage() {
  const { user } = useAuthContext();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { data: adminUsers, isLoading: loadingUsers, refetch } = useGetAdminUsers();
  const { data: availablePermissions } = useGetAvailablePermissions();

  const { mutate: createAdmin, isLoading: creating } = useCreateAdminUser({
    onSuccess: () => {
      setSuccessMessage("Admin user created successfully!");
      setShowSuccess(true);
      setShowCreateModal(false);
      formik.resetForm();
      refetch();
    },
    onError: (error) => {
      console.error("Failed to create admin:", error);
    },
  });

  const { mutate: deactivateAdmin, isLoading: deactivating } = useDeactivateAdminUser({
    onSuccess: () => {
      setSuccessMessage("Admin user deactivated successfully!");
      setShowSuccess(true);
      refetch();
    },
    onError: (error) => {
      console.error("Failed to deactivate admin:", error);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "admin",
      permissions: [] as string[],
      phoneNumber: "",
    },
    validationSchema: object({
      email: string().email("Invalid email").required("Email is required"),
      password: string().min(6, "Password must be at least 6 characters").required("Password is required"),
      role: string().required("Role is required"),
      permissions: array().of(string()),
      phoneNumber: string(),
    }),
    onSubmit: (values) => {
      createAdmin(values);
    },
  });

  const handlePermissionChange = (permission: string, checked: boolean) => {
    const permissions = formik.values.permissions;
    if (checked) {
      formik.setFieldValue("permissions", [...permissions, permission]);
    } else {
      formik.setFieldValue("permissions", permissions.filter(p => p !== permission));
    }
  };

  const handleDeactivateAdmin = (adminId: string) => {
    if (window.confirm("Are you sure you want to deactivate this admin user?")) {
      deactivateAdmin(adminId);
    }
  };

  const columns = [
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
    { key: "lastLoginAt", label: "Last Login" },
    { key: "actions", label: "Actions" },
  ];

  const tableData = adminUsers?.data?.admins?.map((admin: any) => ({
    ...admin,
    lastLoginAt: admin.lastLoginAt ? new Date(admin.lastLoginAt).toLocaleDateString() : "Never",
    actions: (
      <div className="flex space-x-2">
        <Button
          onClick={() => handleDeactivateAdmin(admin.id)}
          isLoading={deactivating}
        >
          Deactivate
        </Button>
      </div>
    ),
  })) || [];

  return (
    <AdminRouteGuard requiredRole="super_admin">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin Management</h1>
          <Button onClick={() => setShowCreateModal(true)}>
            Create New Admin
          </Button>
        </div>

        {showSuccess && (
          <AppToast
            toastProps={{ type: "success" }}
            closeToast={() => setShowSuccess(false)}
          >
            {successMessage}
          </AppToast>
        )}

        <div className="bg-white rounded-lg shadow-sm border">
          <DefaultTable header={columns.map(col => col.label) as any}>
            {loadingUsers ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : tableData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center">
                  No admin users found
                </td>
              </tr>
            ) : (
              tableData.map((admin: any, index: number) => (
                <tr key={index} className="text-sm">
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                      {admin[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </DefaultTable>
        </div>

        {/* Create Admin Modal */}
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        >
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Create New Admin User</h2>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="admin@example.com"
              {...formik.getFieldProps("email")}
              error={formik.touched.email && formik.errors.email}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              {...formik.getFieldProps("password")}
              error={formik.touched.password && formik.errors.password}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                {...formik.getFieldProps("role")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>

            <Input
              label="Phone Number (Optional)"
              type="tel"
              placeholder="+1234567890"
              {...formik.getFieldProps("phoneNumber")}
              error={formik.touched.phoneNumber && formik.errors.phoneNumber}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Permissions
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md p-3">
                {availablePermissions?.data?.map((permission: string) => (
                  <label key={permission} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formik.values.permissions.includes(permission)}
                      onChange={(e) => handlePermissionChange(permission, e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">{permission.replace(/_/g, ' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={creating}
                disabled={!formik.isValid}
              >
                Create Admin
              </Button>
            </div>
          </form>
          </div>
        </Modal>
      </div>
    </AdminRouteGuard>
  );
}
