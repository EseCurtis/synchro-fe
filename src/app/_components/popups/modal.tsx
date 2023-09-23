import React, { ReactNode, FC } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const style = {
  width: '35%',
  minWidth: '30%',
};

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return isOpen ? (
    <div
      style={style}
      className='fixed  mx-auto inset-0 flex items-center justify-center z-50'
    >
      <div className='fixed inset-0 bg-black opacity-50'></div>

      <div className='bg-white p-6 rounded-lg z-50'>
        <div
          onClick={onClose}
          className=' my-2 cursor-pointer top-2 right-2 text-gray-500 hover:text-gray-700'
        >
          <h1 className='font-[1em]'>&times;</h1>
        </div>

        <div className='w-[400px]'>{children}</div>
      </div>
    </div>
  ) : null;
};

export default Modal;
