import { Button } from "@/app/_components/button";
import Input from "@/app/_components/input_fields";
import React from "react";

const FeesConfigurations = () => {
  return (
    <div>
      <h3>Set fees configuration for the whole platform</h3>

      <div className="my-3 flex flex-wrap gap-5 ">
        <Input
          type="text"
          name="event"
          placeholder="Placeholder"
          label="Event tickets commission"
        />
        <Input
          type="text"
          name="invoice"
          placeholder="Placeholder"
          label="Invoice payment commision"
        />

        <Input
          type="text"
          name="withdrawal"
          placeholder="Placeholder"
          label="Withdrawal commision"
        />
      </div>

      <div className="w-[15%]">
        <Button className="py-2 px-3 rounded-full font-semi-bold text-white">
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default FeesConfigurations;
