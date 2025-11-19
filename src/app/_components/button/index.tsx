import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { SolidSpinner, Spinner } from "../spinner/Spinner";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | ReactNode;
  customClassName?: string;
  isLoading?: boolean;
}

const styles = {
  background: "var(--primary-bg-gradient)",
};

export const Button: FC<IButtonProps> = ({
  customClassName,
  children,
  isLoading,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={`w-[100%] gap-2 text-white flex items-center justify-center rounded-full py-4 ${customClassName} ${
        rest.className
      } ${rest.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      style={styles}
    >
      {isLoading ? (
        <>
          <SolidSpinner /> <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
