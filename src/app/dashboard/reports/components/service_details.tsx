import { Button } from "@/app/_components/button";
import Badge from "@/app/_components/forms/badge";
import React from "react";

const ServiceDetails = () => {
  return (
    <div>
      <div className="font-bold text-center">Event details</div>
      <div className="mt-5 p-5">
        <div className="bg-gray-300 rounded w-[100%] h-[100px] relative">
          <div className="bg-gray-500 rounded-full w-[70px] h-[70px] absolute right-[1em] bottom-[-30%] border border-[2px] border-white"></div>
          <p className="absolute font-bold left-[1em] bottom-[-30px]">Jakes Birthday Party</p>
        </div>
      </div>
      <div className=" mt-5 flex gap-4 items-center">
        <Button>Activate User</Button>
        <Button style={{ background: "white", color: "red" }} customClassName="text-red-500 border border-2 border-red-500">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ServiceDetails;
