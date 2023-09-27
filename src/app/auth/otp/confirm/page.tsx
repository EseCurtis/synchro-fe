import { Button } from "@/app/_components/button";
import AuthLayout from "@/app/layouts/authLayout";
import Image from "next/image";
import Link from "next/link";

const Confirm_Otp = () => {
  return (
    <AuthLayout heading="">
      <form action="">
        <center>
          <Image
            src={"/images/mail.svg"}
            width={155}
            height={65}
            alt="Mail Icon"
          />

          <h1 className="font-bold ">Kindly check your email</h1>
          <p className="my-3 text-gray-500">
            Please check your mail inbox for your password rest link to reset
            your password.
          </p>
        </center>

        <Link href={"/dashboard"}>
          <Button>Confirm</Button>
        </Link>
      </form>
    </AuthLayout>
  );
};
export default Confirm_Otp;
