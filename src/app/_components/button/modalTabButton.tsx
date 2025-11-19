import React, { HTMLAttributes } from "react";

interface ModalTabButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  onClick: () => void;
  label: string;
  customClass?: string;
}

const ModalTabButton: React.FC<ModalTabButtonProps> = ({
  isActive,
  onClick,
  label,
  customClass,
  ...rest
}) => {
  const buttonClass =
    "px-[5px] py-2 rounded-full text-[12px] text-black border border-2 border-gray-300";

  const buttonStyle = {
    background: "var(--primary-bg-gradient)",
    border: "none",
    color: "#fff"
  };

  return (
    <button
      className={`${customClass} ${isActive ? `active-tab` : ``}  ${buttonClass}`}
      style={isActive ? buttonStyle : undefined}
      onClick={onClick}
      {...rest}
    >
      {label}
    </button>
  );
};

export default ModalTabButton;
