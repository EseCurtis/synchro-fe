import AuthLayout from '@/app/layouts/authLayout';
import { Button } from '@/app/_components/button';
import Input from '@/app/_components/input_fields';

const Saved_Password = () => {
  return (
    <AuthLayout
      heading='Forgot password'
      subheading='Enter your email below to reset your password'
    >
      <form action=''>
        <Input
          type='email'
          placeholder='Enter email'
          label='Email'
          name='email'
          required={true}
        />
        <Button type='submit'>Reset Password</Button>
      </form>
    </AuthLayout>
  );
};
export default Saved_Password;
