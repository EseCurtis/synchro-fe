import { Button } from './_components/button';
import Input from './_components/input_fields';
import AuthLayout from './layouts/authLayout';
export default function Home() {
  return (
    <AuthLayout heading='Log In'>
      <form action=''>
        <Input label='Email' name='email' placeholder='Email' />
        <Input
          label='Password'
          type='password'
          name='password'
          placeholder='Password'
        />

        <Button>Login</Button>
      </form>
    </AuthLayout>
  );
}
