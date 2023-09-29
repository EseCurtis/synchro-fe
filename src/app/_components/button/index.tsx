import { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | ReactNode;
  customClassName?: string;
}

const styles = {
  background: "var(--primary-bg-gradient)",
};

export const Button: FC<IButtonProps> = ({ customClassName, children, ...rest }) => {
  return (
    <button
      className={`w-[100%]  text-white  rounded-full py-4 my-4 ${customClassName}`}
      style={styles}
      {...rest}
    >
      {children}
    </button>
  );
};
