import React from "react";

interface ModalTabButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: String;
}

const ModalTabButton: React.FC<ModalTabButtonProps> = ({
  isActive,
  onClick,
  label
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
      className={isActive ? `${buttonClass} active-tab` : buttonClass}
      style={isActive ? buttonStyle : undefined}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ModalTabButton;
