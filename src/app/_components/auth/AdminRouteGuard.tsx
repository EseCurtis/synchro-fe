"use client";
import { LoadingScreen } from "@/app/layouts/LoadingScreen";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface AdminRouteGuardProps {
  children: ReactNode;
  requiredRole?: "admin" | "super_admin";
  requiredPermissions?: string[];
}

export function AdminRouteGuard({ 
  children, 
  requiredRole = "admin", 
  requiredPermissions = [] 
}: AdminRouteGuardProps) {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // Check if user is logged in
      if (!user) {
        router.push("/");
        return;
      }

      // Check if user is admin
      if (!user.isAdmin && user.role !== "admin" && user.role !== "super_admin") {
        router.push("/dashboard");
        return;
      }

      // Check role requirements
      if (requiredRole === "super_admin" && user.role !== "super_admin") {
        router.push("/dashboard");
        return;
      }

      // Check permission requirements
      if (requiredPermissions.length > 0) {
        const userPermissions = user.adminPermissions || [];
        const hasRequiredPermissions = requiredPermissions.every(permission =>
          userPermissions.includes(permission)
        );

        if (!hasRequiredPermissions) {
          router.push("/dashboard");
          return;
        }
      }
    }
  }, [user, loading, requiredRole, requiredPermissions, router]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user || !user.isAdmin) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-semibold">Access Denied</h2>
          <p className="text-red-600">You don&apos;t have permission to access this page.</p>
        </div>
      </div>
    );
  }

  if (requiredRole === "super_admin" && user.role !== "super_admin") {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-semibold">Access Denied</h2>
          <p className="text-red-600">Super admin access required.</p>
        </div>
      </div>
    );
  }

  if (requiredPermissions.length > 0) {
    const userPermissions = user.adminPermissions || [];
    const hasRequiredPermissions = requiredPermissions.every(permission =>
      userPermissions.includes(permission)
    );

    if (!hasRequiredPermissions) {
      return (
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h2 className="text-red-800 font-semibold">Access Denied</h2>
            <p className="text-red-600">You don&apos;t have the required permissions.</p>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}
