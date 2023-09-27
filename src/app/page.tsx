import { Button } from "./_components/button";
import Input from "./_components/input_fields";
import AuthLayout from "./layouts/authLayout";
import Link from "next/link";

export default function Home() {
  return (
    <AuthLayout
      heading="Log In"
      subheading="Enter your credentials below to login"
    >
      <form action="">
        <Input label="Email" name="email" placeholder="Email" />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Password"
        />

        <Link href={"/auth/password"}>
          <p className="text-right">Forgotten Password</p>
        </Link>

        <Link href="/auth/otp">
          <Button>Login</Button>
        </Link>
      </form>
    </AuthLayout>
  );
}
