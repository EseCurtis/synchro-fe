import React, { ReactNode, FC } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: any;
}

const style = {
  width: "35%",
  minWidth: "30%",
  marginTop: 0,
};

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return isOpen ? (
    <div
      style={style}
      className="fixed mx-auto my-auto inset-0 flex items-center justify-center z-500 h-screen p-3"
    >
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="relative bg-white p-10 rounded-lg z-50 max-h-[100%] h-full">
        <div
          onClick={onClose}
          className="px-4 absolute my-2 cursor-pointer text-right top-0 right-2 text-gray-500 hover:text-gray-700"
        >
          <h1 className="text-[1.5em]">&times;</h1>
        </div>

        <div className="w-[400px] flex overflow-y-hidden h-full">{children}</div>
      </div>
    </div>
  ) : null;
};

export default Modal;
