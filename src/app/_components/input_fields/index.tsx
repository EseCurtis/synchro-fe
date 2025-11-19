"use client";

import React, {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  useMemo,
  useState,
} from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CurrencyConverter from "../forms/currencyConverter";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
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
  name = name || useMemo(() => String(new Date().getTime()), []);
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
  const [isVisible, setIsVisible] = useState<boolean>(true);

  return (
    <div className="my-[15px] flex flex-col gap-[5px]">
      <div>
        <label htmlFor={rest.id}>{label}</label>
      </div>
      <div className="relative">
        <input
          name={name}
          onChange={onChange}
          className="px-[16px]  h-[48px] rounded-md w-[100%] outline-none  "
          style={{
            border: "1px solid #DDE2E5",
          }}
          {...rest}
          type={!isVisible ? rest.type : "text"}
        />
        {rest.type == "password" && (
          <div
            className="absolute top-[50%] right-5 translate-y-[-50%] cursor-pointer"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? <FaEyeSlash /> : <FaEye />}
          </div>
        )}
      </div>
      {error && <p className="text-[14px] text-red-500">{error}</p>}
    </div>
  );
};

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  error?: any;
  options: { value: string; label: string }[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select: React.FC<SelectProps> = ({
  name,
  error,
  label,
  options,
  onChange,
  ...rest
}) => {
  return (
    <div className="my-[15px] flex flex-col gap-[5px]">
      <div>
        <label htmlFor={rest.id}>{label}</label>
      </div>
      <select
        name={name}
        onChange={onChange}
        className="px-[16px] h-[48px] rounded-md w-[100%] outline-none bg-white"
        style={{
          border: "1px solid #DDE2E5",
        }}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-[14px] text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
