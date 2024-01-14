import Image from "next/image";
import { FC, ReactNode } from "react";

interface IAuthProps {
  children?: ReactNode;
  heading?: string;
  subheading?: string;
}

const AuthLayout: FC<IAuthProps> = ({
  children,
  heading,
  subheading,
}: IAuthProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:h-[80vh] lg:h-[100vh] ">
      <div
        className="py-[1em] flex justify-center w-[100%] items-center text-white px-3 md:w-[1009px]  "
        style={{
          backgroundImage: "url(/images/background/background.svg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <Image
            src={"/images/auth.svg"}
            height="476"
            width="352"
            alt="auth image"
          />
          <div className=" w-[90%] mx-auto lg:w-[433px] py-5 text-center">
            <h3 className="font-bold  text-[20px] lg:text-[32px]">
              Welcome to Synchro Backoffice
            </h3>
            <p>Kindly enter your valid credentials login to the system</p>
          </div>
        </div>
      </div>
      {/* right side for auth */}
      <div className="items-center flex  ">
        <div
          style={{
            // position: 'absolute',
            right: "15em",
            boxShadow: "0px 50px 77px 0px rgba(176, 183, 195, 0.22)",
          }}
          className="bg-white px-[2em] rounded-xl w-[500px] h-[550px] sm:static lg:absolute"
        >
          <div className="text-center">
            <Image
              src={"/images/synco_logo.png"}
              width={170}
              height={40}
              alt="Logo"
              className="my-4 mx-auto"
            />
            <div className="my-5">
              <h2 className="text-[28px] font-bold">{heading || ""}</h2>
              <p>{subheading || ""}</p>
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
