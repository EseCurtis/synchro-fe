import React, { ReactNode, FC } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const style = {
  width: "35%",
  minWidth: "30%",
};

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return isOpen ? (
    <div
      style={style}
      className="fixed  mx-auto inset-0 flex items-center justify-center z-500"
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>

      <div className="relative bg-white p-10 rounded-lg z-50">
        <div
          onClick={onClose}
          className="px-4 absolute top-0 my-2 cursor-pointer text-right top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <h1 className="text-[1.5em]">&times;</h1>
        </div>

        <div className="w-[400px]">{children}</div>
      </div>
    </div>
  ) : null;
};

export default Modal;
