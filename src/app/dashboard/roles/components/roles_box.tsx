import Dropdown from "@/app/_components/popups/dropDown";
import Modal from "@/app/_components/popups/modal";
import {
  cloneElement,
  FC,
  Fragment,
  isValidElement,
  ReactNode,
  useState,
} from "react";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const dropDownData = [
    {
      title: <p className="text-[#041549]">Edit Role</p>,
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.4"
            fillRule="evenodd"
            clip-rule="evenodd"
            d="M11.8246 4.03054C12.9628 4.90909 13.9319 6.1962 14.6278 7.8059C14.6798 7.92808 14.6798 8.07095 14.6278 8.18731C13.2359 11.4067 10.7579 13.3332 8.00016 13.3332H7.99366C5.24244 13.3332 2.76439 11.4067 1.37252 8.18731C1.32049 8.07095 1.32049 7.92808 1.37252 7.8059C2.76439 4.58586 5.24244 2.6665 7.99366 2.6665H8.00016C9.37902 2.6665 10.6863 3.14489 11.8246 4.03054ZM5.39854 7.99984C5.39854 9.42206 6.56276 10.5792 8.00016 10.5792C9.43106 10.5792 10.5953 9.42206 10.5953 7.99984C10.5953 6.57115 9.43106 5.41398 8.00016 5.41398C6.56276 5.41398 5.39854 6.57115 5.39854 7.99984Z"
            fill="#200E32"
          />
          <path
            d="M9.62102 7.998C9.62102 8.88365 8.89256 9.6077 8.0015 9.6077C7.10394 9.6077 6.37549 8.88365 6.37549 7.998C6.37549 7.8881 6.3885 7.78531 6.40801 7.68188H6.44053C7.16248 7.68188 7.74785 7.11299 7.77386 6.40123C7.84541 6.38895 7.92346 6.38184 8.0015 6.38184C8.89256 6.38184 9.62102 7.10588 9.62102 7.998Z"
            fill="#200E32"
          />
        </svg>
      ),
    },
    {
      title: <p className="text-[#EB0000]">Delete Role</p>,
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.3332 3.5H10.5238C10.4618 3.37867 10.4138 3.24134 10.3625 3.088L10.2278 2.68333C10.0918 2.27533 9.70984 2 9.27917 2H6.7205C6.28983 2 5.90784 2.27533 5.77184 2.68333L5.63717 3.088C5.58583 3.24134 5.53784 3.37867 5.47584 3.5H2.6665C2.3905 3.5 2.1665 3.724 2.1665 4C2.1665 4.276 2.3905 4.5 2.6665 4.5H13.3332C13.6092 4.5 13.8332 4.276 13.8332 4C13.8332 3.724 13.6092 3.5 13.3332 3.5Z"
            fill="#FF5252"
          />
          <path
            d="M9.3335 11.1668C9.0575 11.1668 8.8335 10.9428 8.8335 10.6668V7.3335C8.8335 7.0575 9.0575 6.8335 9.3335 6.8335C9.6095 6.8335 9.8335 7.0575 9.8335 7.3335V10.6668C9.8335 10.9428 9.6095 11.1668 9.3335 11.1668Z"
            fill="#FF5252"
          />
          <path
            d="M6.6665 11.1668C6.3905 11.1668 6.1665 10.9428 6.1665 10.6668V7.3335C6.1665 7.0575 6.3905 6.8335 6.6665 6.8335C6.9425 6.8335 7.1665 7.0575 7.1665 7.3335V10.6668C7.1665 10.9428 6.9425 11.1668 6.6665 11.1668Z"
            fill="#FF5252"
          />
          <path
            opacity="0.4"
            d="M12.6334 4.5L12.1267 12.1333C12.0534 13.1867 11.5 14 10.1267 14H5.87336C4.50003 14 3.9467 13.1867 3.87336 12.1333L3.3667 4.5H12.6334Z"
            fill="#FF5252"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-[310px] rounded-[12px]" style={styles}>
      <div className="flex justify-between items-center">
        <h3 className="font-md  text-[18px] ">{role}</h3>
        <Dropdown
          view={
            <img
              src="/images/icons/dashboard/table/more.svg"
              width={27}
              height={11}
              alt=""
              onClick={toggleDropdown}
            />
          }
        >
          {dropDownData.map(({ title, icon }, index) => (
            <Fragment key={index}>
              <div className="flex gap-3 py-[.5em]">
                {icon}
                {title}
              </div>
            </Fragment>
          ))}
        </Dropdown>
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
        {isValidElement(modalProps)
          ? cloneElement(modalProps, { onClose: closeModal as any } as any)
          : modalProps}
      </Modal>
    </div>
  );
};
export { AddNewRoleComponent, RolesComponent };

