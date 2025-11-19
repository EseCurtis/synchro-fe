import { Button } from "@/app/_components/button";
import Badge from "@/app/_components/forms/badge";
import InputField from "@/app/_components/forms/inputField";
import Input from "@/app/_components/input_fields";
import React from "react";

const declineIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.4" d="M22 12C22 17.524 17.523 22 12 22C6.477 22 2 17.524 2 12C2 6.478 6.477 2 12 2C17.523 2 22 6.478 22 12Z" fill="#FF5252"/>
<path fillRule="evenodd" clipRule="evenodd" d="M12.8701 12.6309C12.8701 13.1129 12.4771 13.5059 11.9951 13.5059C11.5131 13.5059 11.1201 13.1129 11.1201 12.6309V8.21094C11.1201 7.72894 11.5131 7.33594 11.9951 7.33594C12.4771 7.33594 12.8701 7.72894 12.8701 8.21094V12.6309ZM11.1251 15.8037C11.1251 15.3217 11.5161 14.9287 11.9951 14.9287C12.4881 14.9287 12.8801 15.3217 12.8801 15.8037C12.8801 16.2857 12.4881 16.6787 12.0051 16.6787C11.5201 16.6787 11.1251 16.2857 11.1251 15.8037Z" fill="#FF5252"/>
</svg>

)

const DeclineKYC = () => {
  return (
    <div>
      <h3 className="flex gap-2"> {declineIcon} Decline KYC </h3>
      <p className="mt-4 mb-5">
        Are you sure you want to decline <b>Courtney Henry&quot;s KYC?</b>
      </p>

      <Input label="Reasons for declining" name="email" placeholder="Enter reasons" />

      <div className=" mt-5 flex gap-4 items-center">
        <Button>Decline</Button>
        <Button style={{ background: "white", color: "red" }} customClassName="text-red-500 border border-2 border-red-500">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DeclineKYC;
