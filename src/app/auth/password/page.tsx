import AuthLayout from '@/app/layouts/authLayout';
import { Button } from '@/app/_components/button';
import Input from '@/app/_components/input_fields';

const Forgotten_password = () => {
  return (
    <AuthLayout
      heading='Forgot password'
      subheading='Enter your credentials below to login'
    >
      <form action=''>
        <Input
          type='email'
          placeholder='Enter email'
          label='Email'
          name='email'
          required={true}
        />
        <Button type='submit'>Confirm Code</Button>
      </form>
    </AuthLayout>
  );
};
export default Forgotten_password;
