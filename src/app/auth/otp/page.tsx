import { Button } from "@/app/_components/button";
import AuthLayout from "@/app/layouts/authLayout";
import LinkWithProgress from "../../_components/ui/LinkWithProgress";
const Otp = () => {
  return (
    <AuthLayout heading="OTP Verification">
      <form action="">
        <LinkWithProgress href={"/auth/otp/confirm"}>
          <Button>Confirm Code</Button>
        </LinkWithProgress>
      </form>
    </AuthLayout>
  );
};
export default Otp;
