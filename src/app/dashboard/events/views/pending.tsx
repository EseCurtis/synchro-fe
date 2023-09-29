"use client";

import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import DefaultTable from "@/app/_components/table/defaultTable";
import TablePagination from "@/app/_components/table/tablePagination";
import { table } from "@/utils/contents/dummy/table";
import React, { useState, Fragment } from "react";
import Image from "../../../../../node_modules/next/image";
import Dropdown from "@/app/_components/popups/dropDown";
import Modal from "@/app/_components/popups/modal";
import ViewInformation from "../components/EventDetails";

const header = [
  "Business Name ",
  "Doc Type",
  "File Upload",
  "Date Submitted",
  "",
  "",
];
const style = "px-6 py-4 whitespace-no-wrap border-b border-gray-300";
const PendingEvents = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const dropDownData = [
    {
      title: (
        <p className="text-[#041549]" onClick={openModal}>
          View User
        </p>
      ),
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
            fill-rule="evenodd"
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
      title: <p className="text-[#F2994A]">Suspend User</p>,
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.7409 3.31689L3.31689 11.7409C3.59556 12.0889 3.91144 12.4048 4.25944 12.6834L12.6834 4.25944C12.4048 3.91144 12.0889 3.59556 11.7409 3.31689Z"
            fill="#F2994A"
          />
          <path
            opacity="0.4"
            d="M7.99984 0.666504C3.9565 0.666504 0.666504 3.9565 0.666504 7.99984C0.666504 12.0432 3.9565 15.3332 7.99984 15.3332C12.0432 15.3332 15.3332 12.0432 15.3332 7.99984C15.3332 3.9565 12.0432 0.666504 7.99984 0.666504ZM7.99984 13.9998C6.58517 13.9998 5.28578 13.5051 4.25911 12.6831C3.91111 12.4044 3.59524 12.0886 3.31657 11.7406C2.49457 10.7132 1.99984 9.41384 1.99984 7.99984C1.99984 4.69184 4.69117 1.99984 7.99984 1.99984C9.4145 1.99984 10.7139 2.49457 11.7406 3.31657C12.0886 3.59524 12.4044 3.91111 12.6831 4.25911C13.5051 5.28645 13.9998 6.58584 13.9998 7.99984C13.9998 11.3078 11.3085 13.9998 7.99984 13.9998Z"
            fill="#F2994A"
          />
        </svg>
      ),
    },
    {
      title: <p className="text-[#EB0000]">Delete User</p>,
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
    <div>
      <DashboardAction />
      {/* @ts-ignore */}
      <DefaultTable header={header}>
        {table?.map((_, key: number) => {
          return (
            <tr key={key}>
              <td className={style}>
                <div className="flex gap-5 items-center">
                  <div className="w-[3em] h-[3em] bg-gray-500 rounded-full"></div>
                  <div>
                    <h3>{_.name}</h3>
                    <p className="text-second_primary_text">{_.email}</p>
                  </div>
                </div>
              </td>
              <td className={style}>
                <h3>Legal Document</h3>
              </td>
              <td className={style}>
                <h3 className="underline">Legal Document.pdf</h3>
              </td>
              <td className={style}>
                <h3>{_.date}</h3>
              </td>
              <td className={`whitespace-no-wrap border-b border-gray-300`}>
                <div className="flex items-center justify-space-around">
                  <Image
                    src="/images/icons/dashboard/table/tick.svg"
                    width={60}
                    height={60}
                    alt=""
                  />
                  <Image
                    src="/images/icons/dashboard/table/times.svg"
                    width={60}
                    height={60}
                    alt=""
                  />
                </div>
              </td>
              <td className={style}>
                <Dropdown
                  view={
                    <Image
                      src="/images/icons/dashboard/table/more.svg"
                      width={50}
                      height={33}
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
              </td>
            </tr>
          );
        })}
      </DefaultTable>
      <TablePagination />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ViewInformation />
      </Modal>
    </div>
  );
};

export default PendingEvents;
