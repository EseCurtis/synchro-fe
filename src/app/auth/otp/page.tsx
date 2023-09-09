import AuthLayout from '@/app/layouts/authLayout';
import { Button } from '@/app/_components/button';

const Otp = () => {
  return (
    <AuthLayout heading='OTP Verification'>
      <form action=''>
        <Button>Confirm Code</Button>
      </form>
    </AuthLayout>
  );
};
export default Otp;
