import { Button } from "@/app/_components/button";
import CurrencyConverter from "@/app/_components/forms/currencyConverter";
import Input, { CurrencyInput } from "@/app/_components/input_fields";
import React from "react";

const FeesConfigurations = () => {
  return (
    <div>
      <h3>Set fees configuration for the whole platform</h3>

      <div className="my-3 grid grid-cols-2 gap-5 ">
        <CurrencyInput
          type="text"
          name="invoice"
          placeholder="Placeholder"
          label="Invoice payment commision"
        />

        <CurrencyInput
          type="text"
          name="invoice"
          placeholder="Placeholder"
          label="Invoice payment commision"
        />

        <CurrencyInput
          type="text"
          name="invoice"
          placeholder="Placeholder"
          label="Invoice payment commision"
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
