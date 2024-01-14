import React, { InputHTMLAttributes } from "react";
import CurrencyConverter from "../forms/currencyConverter";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CurrencyInput: React.FC<InputProps> = ({
  name,
  label,
  onChange,
  ...rest
}) => {
  return (
    <div className="my-[15px]">
      <div>
        <label>{label}</label>
      </div>
      <CurrencyConverter name={name} onChange={onChange} {...rest} />
    </div>
  );
};

const Input: React.FC<InputProps> = ({
  name,
  error,
  label,
  onChange,
  ...rest
}) => {
  return (
    <div className="my-[15px] flex flex-col gap-[5px]">
      <div>
        <label htmlFor={rest.id}>{label}</label>
      </div>
      <input
        name={name}
        onChange={onChange}
        className="px-[16px]  h-[48px] rounded-md w-[100%] outline-none  "
        style={{
          border: "1px solid #DDE2E5",
        }}
        {...rest}
      />
      {error && <p className="text-[14px] text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
