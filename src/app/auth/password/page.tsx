import AuthLayout from "@/app/layouts/authLayout";
import { Button } from "@/app/_components/button";
import Input from "@/app/_components/input_fields";
import Link from "next/link";

const Forgotten_password = () => {
  return (
    <AuthLayout
      heading="Forgot password"
      subheading="Enter your email below to reset your password"
    >
      <form action="">
        <Input
          type="email"
          placeholder="Enter email"
          label="Email"
          name="email"
          required={true}
        />
        <Link href={"/auth/otp"}>
          <Button type="submit">Send Code</Button>
        </Link>
      </form>
    </AuthLayout>
  );
};
export default Forgotten_password;
