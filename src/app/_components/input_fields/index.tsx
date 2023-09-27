import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ name, label, onChange, ...rest }) => {
  return (
    <div className="my-[15px]">
      <div>
        <label>{label}</label>
      </div>
      <input
        name={name}
        onChange={onChange}
        className=" my-[5px] px-[39px]  h-[48px] rounded-md w-[100%] sm:w-[461px]  outline-none  "
        style={{
          border: "1px solid #DDE2E5",
        }}
        {...rest}
      />
    </div>
  );
};

export default Input;
