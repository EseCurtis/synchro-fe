"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import { useTMutation } from "@/hooks/api/useTMutation";
import { useFormik } from "formik";
import { object, string } from "yup";
import { Button } from "./_components/button";
import Input from "./_components/input_fields";
import LinkWithProgress from "./_components/ui/LinkWithProgress";
import AuthLayout from "./layouts/authLayout";

export default function Home() {
  const { signin } = useAuthContext();

  const { mutate, isLoading } = useTMutation({
    url: "/admin/auth/login",
    method: "post",
    options: {
      onSuccess: (data) => {
        signin(data.data.tokens.accessToken);
      },
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: object({
      email: string().email("Invalid email").required("Email is required"),
      password: string().required("Password is required"),
    }),

    onSubmit: (values: any) => {
      mutate(values);
    },
    onReset: () => {},
  });
  return (
    <AuthLayout
      heading="Log In"
      subheading="Enter your credentials below to login"
    >
      <form onSubmit={formik.handleSubmit}>
        <Input
          label="Email"
          placeholder="Email"
          {...formik.getFieldProps("email")}
          error={formik.touched.email && formik.errors.email}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Password"
          {...formik.getFieldProps("password")}
          error={formik.touched.password && formik.errors.password}
        />

        <LinkWithProgress href={"/auth/password"}>
          <p className="text-right">Forgotten Password</p>
        </LinkWithProgress>

        <Button type="submit" isLoading={isLoading}>
          Login
        </Button>
      </form>
    </AuthLayout>
  );
}
