import Modal from "@/app/_components/popups/modal";
import { FC, ReactNode, useState } from "react";
import { MdMoreHoriz } from "react-icons/md";

interface IPropsRoles {
  role: string;
  content: string;
}

const styles = {
  border: "1.8px solid #EDEFF5 ",
  maxHeight: "180px",
  padding: "18px 20px",
};

const RolesComponent: FC<IPropsRoles> = ({ role, content }) => {
  return (
    <div className="w-[310px] rounded-[12px]" style={styles}>
      <div className="flex justify-between items-center">
        <h3 className="font-md  text-[18px] ">{role}</h3>
        <MdMoreHoriz cursor="pointer" />
      </div>

      <p
        className=" text-second_primary_text my-4"
        style={{
          fontSize: "15px",
        }}
      >
        {content}
      </p>

      <div className=" flex  justify-end">
        {[1, 2, 3].map((_) => (
          <div
            key={_}
            className="bg-gray-400 w-[40px]  -ml-4 ring-[2px] ring-white h-[40px] rounded-full"
          ></div>
        ))}
      </div>
    </div>
  );
};

interface IRoleProps {
  title: string;
  modalProps: ReactNode;
}

const AddNewRoleComponent: FC<IRoleProps> = ({ title, modalProps }) => {
  const [isOpen, setIsOpen] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="w-[310px] cursor-pointer text-center rounded-[12px]"
      style={styles}
    >
      <div
        onClick={openModal}
        className="flex items-center flex-col h-[100%] justify-center"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="30" height="30" rx="15" fill="#E2E8F0" />
          <path
            d="M20.8539 15.0002C20.8539 15.3129 20.6001 15.5667 20.2874 15.5667H15.5667V20.2874C15.5667 20.6001 15.3129 20.8539 15.0002 20.8539C14.6875 20.8539 14.4337 20.6001 14.4337 20.2874V15.5667H9.71297C9.40027 15.5667 9.14648 15.3129 9.14648 15.0002C9.14648 14.6875 9.40027 14.4337 9.71297 14.4337H14.4337V9.71297C14.4337 9.40027 14.6875 9.14648 15.0002 9.14648C15.3129 9.14648 15.5667 9.40027 15.5667 9.71297V14.4337H20.2874C20.6001 14.4337 20.8539 14.6875 20.8539 15.0002Z"
            fill="#25314C"
          />
        </svg>

        <p
          className=" w-[60%]  text-second_primary_text my-4"
          style={{
            fontSize: "15px",
          }}
        >
          {title}
        </p>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalProps}
      </Modal>
    </div>
  );
};
export { RolesComponent, AddNewRoleComponent };
