"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import { useTMutation } from "@/hooks/api/useTMutation";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { array, object, string } from "yup";
import { Button } from "../../_components/button";
import Input, { Select } from "../../_components/input_fields";
import AuthLayout from "../../layouts/authLayout";

// Admin roles enum (matching server-side)
enum UserRole {
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
  MODERATOR = "moderator",
}

// Available permissions
const AVAILABLE_PERMISSIONS = [
  "user_management",
  "event_management", 
  "venue_management",
  "service_management",
  "report_management",
  "system_settings",
  "notification_management",
  "audit_access",
  "financial_management",
  "content_moderation",
];

export default function AdminSignupPage() {
  const { signin } = useAuthContext();
  const [showPermissions, setShowPermissions] = useState(false);

  const { mutate, isLoading } = useTMutation({
    url: "/admin/auth/register",
    method: "post",
    options: {
      onSuccess: (data) => {
        // Auto-login after successful registration
        signin(data.data.tokens.accessToken);
      },
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      role: UserRole.ADMIN,
      permissions: [] as string[],
      phoneNumber: "",
    },
    validationSchema: object({
      email: string().email("Invalid email").required("Email is required"),
      password: string()
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
        .required("Password is required"),
      confirmPassword: string()
      
        .required("Please confirm your password"),
      role: string().required("Role is required"),
      permissions: array().of(string()),
      phoneNumber: string().matches(
        /^[\+]?[1-9][\d]{0,15}$/,
        "Please enter a valid phone number"
      ),
    }),
    onSubmit: (values) => {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...submitData } = values;
      mutate(submitData);
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

  const handleRoleChange = (role: string) => {
    formik.setFieldValue("role", role);
    
    // Auto-select permissions based on role
    if (role === UserRole.SUPER_ADMIN) {
      formik.setFieldValue("permissions", AVAILABLE_PERMISSIONS);
    } else if (role === UserRole.ADMIN) {
      formik.setFieldValue("permissions", [
        "user_management",
        "event_management",
        "venue_management",
        "service_management",
        "report_management",
        "notification_management",
        "content_moderation",
      ]);
    } else if (role === UserRole.MODERATOR) {
      formik.setFieldValue("permissions", [
        "report_management",
        "content_moderation",
        "notification_management",
      ]);
    } else {
      formik.setFieldValue("permissions", []);
    }
  };

  return (
    <AuthLayout
      heading="Create Admin Account"
      subheading="Set up a new administrator account for the system"
    >
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Email Field */}
        <Input
          label="Email Address"
          placeholder="admin@synchro.app"
          type="email"
          {...formik.getFieldProps("email")}
          error={formik.touched.email && formik.errors.email}
        />

        {/* Password Field */}
        <Input
          label="Password"
          type="password"
          placeholder="Enter secure password"
          {...formik.getFieldProps("password")}
          error={formik.touched.password && formik.errors.password}
        />

        {/* Confirm Password Field */}
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          {...formik.getFieldProps("confirmPassword")}
          error={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />

        {/* Phone Number Field */}
        <Input
          label="Phone Number (Optional)"
          placeholder="+1234567890"
          type="tel"
          {...formik.getFieldProps("phoneNumber")}
          error={formik.touched.phoneNumber && formik.errors.phoneNumber}
        />

        {/* Role Selection */}
        <Select
          name="role"
          label="Admin Role"
          value={formik.values.role}
          onChange={(e) => handleRoleChange(e.target.value)}
          error={formik.touched.role && formik.errors.role}
          options={[
            { value: UserRole.MODERATOR, label: "Moderator" },
            { value: UserRole.ADMIN, label: "Admin" },
            { value: UserRole.SUPER_ADMIN, label: "Super Admin" },
          ]}
        />

        {/* Permissions Section */}
        <div className="my-[15px]">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium">Permissions</label>
            <button
              type="button"
              onClick={() => setShowPermissions(!showPermissions)}
              className="text-blue-600 text-sm hover:underline"
            >
              {showPermissions ? "Hide" : "Customize"} Permissions
            </button>
          </div>
          
          {showPermissions && (
            <div className="border border-[#DDE2E5] rounded-md p-4 max-h-48 overflow-y-auto">
              <div className="grid grid-cols-1 gap-2">
                {AVAILABLE_PERMISSIONS.map((permission) => (
                  <label key={permission} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={formik.values.permissions.includes(permission)}
                      onChange={(e) => handlePermissionChange(permission, e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="capitalize">
                      {permission.replace(/_/g, " ")}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
          
          {/* Selected Permissions Summary */}
          <div className="mt-2">
            <p className="text-xs text-gray-600">
              Selected: {formik.values.permissions.length} permission(s)
            </p>
            {formik.values.permissions.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {formik.values.permissions.slice(0, 3).map((permission) => (
                  <span
                    key={permission}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                  >
                    {permission.replace(/_/g, " ")}
                  </span>
                ))}
                {formik.values.permissions.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    +{formik.values.permissions.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Role Description */}
        <div className="bg-gray-50 p-3 rounded-md text-sm">
          <h4 className="font-medium mb-2">Role Description:</h4>
          {formik.values.role === UserRole.SUPER_ADMIN && (
            <p className="text-gray-600">
              Full system access including user management, system settings, and financial controls.
            </p>
          )}
          {formik.values.role === UserRole.ADMIN && (
            <p className="text-gray-600">
              Comprehensive access to manage users, events, venues, services, and reports.
            </p>
          )}
          {formik.values.role === UserRole.MODERATOR && (
            <p className="text-gray-600">
              Limited access focused on content moderation and report management.
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" isLoading={isLoading} >
          Create Admin Account
        </Button>

        {/* Login Link */}
        <div className="text-center mt-4 pb-3">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/" className="text-blue-600 hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
