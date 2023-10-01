"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import { Button } from "./_components/button";
import Input from "./_components/input_fields";
import AuthLayout from "./layouts/authLayout";
import Link from "next/link";
import { useTMutation } from "@/hooks/api/useTMutation";
import { Form, useFormik } from "formik";
import { object, string } from "yup";

export default function Home() {
  const { signin } = useAuthContext();

  const { mutate, isLoading } = useTMutation({
    url: "/user/login",
    method: "post",
    options: {
      onSuccess: (data) => {
        signin(data.data);
      },
    },
  });

  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    validationSchema: object({
      identifier: string().required("Email is required"),
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
          {...formik.getFieldProps("identifier")}
          error={formik.touched.identifier && formik.errors.identifier}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Password"
          {...formik.getFieldProps("password")}
          error={formik.touched.identifier && formik.errors.password}
        />

        <Link href={"/auth/password"}>
          <p className="text-right">Forgotten Password</p>
        </Link>

        <Button type="submit" isLoading={isLoading}>
          Login
        </Button>
      </form>
    </AuthLayout>
  );
}
