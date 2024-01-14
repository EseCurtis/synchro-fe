import AuthLayout from "@/app/layouts/authLayout";
import { Button } from "@/app/_components/button";
import Link from "next/link";
const Otp = () => {
  return (
    <AuthLayout heading="OTP Verification">
      <form action="">
        <Link href={"/auth/otp/confirm"}>
          <Button>Confirm Code</Button>
        </Link>
      </form>
    </AuthLayout>
  );
};
export default Otp;
