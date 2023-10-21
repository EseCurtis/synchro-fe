"use client";
import { AppToast } from "@/app/_components/AppToast";
import { Button } from "@/app/_components/button";
import CurrencyConverter from "@/app/_components/forms/currencyConverter";
import Input, { CurrencyInput } from "@/app/_components/input_fields";
import { useTMutation } from "@/hooks/api/useTMutation";
import { useTQuery } from "@/hooks/api/useTQuery";
import React, { useState } from "react";
import { toast } from "react-toastify";

const FeesConfigurations = () => {
  useTQuery({
    url: "/settings",
    queryKey: ["settings"],
    options: {
      onSuccess: (res: any) => {
        setBody(res.data);
      },
    },
  });

  const [body, setBody] = useState<any>({
    invoiceCommission: 0,
    withdrawalCommission: 0,
  });

  const { mutate, isLoading } = useTMutation({
    url: "/settings",
    method: "post",
    options: {
      onSuccess: () => {
        toast(<AppToast>Fees updated successfully</AppToast>);
      },
    },
  });

  return (
    <div>
      <h3>Set fees configuration for the whole platform</h3>

      <div className="my-3 grid grid-cols-2 gap-5 ">
        <CurrencyInput
          type="text"
          name="invoice"
          placeholder="Placeholder"
          label="Invoice payment commission"
          value={body?.invoiceCommission}
          onChange={(e) =>
            setBody({ ...body, invoiceCommission: e.target.value })
          }
        />

        <CurrencyInput
          type="text"
          name="invoice"
          placeholder="Placeholder"
          label="Withdrawal commission"
          value={body?.withdrawalCommission}
          onChange={(e) =>
            setBody({ ...body, withdrawalCommission: e.target.value })
          }
        />

        {/* <CurrencyInput
          type="text"
          name="invoice"
          placeholder="Placeholder"
          label="Invoice payment commision"
        /> */}
      </div>

      <div className="w-[15%]">
        <Button
          isLoading={isLoading}
          onClick={() => {
            mutate(body);
          }}
          className="py-2 px-3 rounded-full font-semi-bold text-white"
        >
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default FeesConfigurations;
