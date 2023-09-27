import { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | ReactNode;
}

const styles = {
  background: "var(--primary-bg-gradient)",
};

export const Button: FC<IButtonProps> = ({ children, ...rest }) => {
  return (
    <button
      className="w-[100%]  text-white  rounded-full py-4 my-4"
      style={styles}
      {...rest}
    >
      {children}
    </button>
  );
};
