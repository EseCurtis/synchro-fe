"use client";
import { AppToast } from "@/app/_components/AppToast";
import { AdminRouteGuard } from "@/app/_components/auth/AdminRouteGuard";
import { Button } from "@/app/_components/button";
import Input from "@/app/_components/input_fields";
import { useAuthContext } from "@/contexts/AuthContext";
import { useAdminChangePassword } from "@/hooks/api/auth/useAdminChangePassword";
import { useFormik } from "formik";
import { useState } from "react";
import { object, ref, string } from "yup";

export default function ChangePasswordPage() {
  const { user } = useAuthContext();
  const [showSuccess, setShowSuccess] = useState(false);

  const { mutate, isLoading } = useAdminChangePassword({
    onSuccess: () => {
      setShowSuccess(true);
      formik.resetForm();
    },
    onError: (error) => {
      console.error("Password change failed:", error);
    },
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: object({
      currentPassword: string().required("Current password is required"),
      newPassword: string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),
      confirmPassword: string()
        .oneOf([ref("newPassword")], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <AdminRouteGuard>
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Change Password</h1>
        
        {showSuccess && (
          <AppToast
            toastProps={{ type: "success" }}
            closeToast={() => setShowSuccess(false)}
          >
            Password changed successfully!
          </AppToast>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <Input
              label="Current Password"
              type="password"
              placeholder="Enter your current password"
              {...formik.getFieldProps("currentPassword")}
              error={formik.touched.currentPassword && formik.errors.currentPassword}
            />
          </div>

          <div>
            <Input
              label="New Password"
              type="password"
              placeholder="Enter your new password"
              {...formik.getFieldProps("newPassword")}
              error={formik.touched.newPassword && formik.errors.newPassword}
            />
          </div>

          <div>
            <Input
              label="Confirm New Password"
              type="password"
              placeholder="Confirm your new password"
              {...formik.getFieldProps("confirmPassword")}
              error={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              onClick={() => formik.resetForm()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              disabled={!formik.isValid || !formik.dirty}
            >
              Change Password
            </Button>
          </div>
        </form>
      </div>
    </div>
    </AdminRouteGuard>
  );
}
