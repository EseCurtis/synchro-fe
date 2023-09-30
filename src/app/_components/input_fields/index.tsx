import React, { InputHTMLAttributes } from "react";
import CurrencyConverter from "../forms/currencyConverter";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
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

const Input: React.FC<InputProps> = ({ name, label, onChange, ...rest }) => {
  return (
    <div className="my-[15px]">
      <div>
        <label htmlFor={rest.id}>{label}</label>
      </div>
      <input
        name={name}
        onChange={onChange}
        className="my-[5px] px-[16px]  h-[48px] rounded-md w-[100%] outline-none  "
        style={{
          border: "1px solid #DDE2E5",
        }}
        {...rest}
      />
    </div>
  );
};

export default Input;
