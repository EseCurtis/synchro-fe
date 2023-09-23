import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | ReactNode;
}

const style = {
  border: '1px solid red',
};

export const SecondaryButton: FC<IButtonProps> = ({ children, ...rest }) => {
  return (
    <button
      style={style}
      className='w-[100%]  text-white  rounded-full py-4 my-4 bg-none '
      {...rest}
    >
      {children}
    </button>
  );
};
