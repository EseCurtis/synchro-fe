"use client";

import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import DefaultTable from "@/app/_components/table/defaultTable";
import TablePagination from "@/app/_components/table/tablePagination";
import { table } from "@/utils/contents/dummy/table";
import React, { useState, Fragment } from "react";
import Image from "../../../../../node_modules/next/image";
import Dropdown from "@/app/_components/popups/dropDown";
import Modal from "@/app/_components/popups/modal";
import ViewInformation from "../components/viewInfo";
import DeclineKYC from "../components/decline_kyc";
import Toast from "../components/toast";

const header = [
  "Business Name ",
  "Doc Type",
  "File Uploaded",
  "Status",
  "Date Approved",
  "",
];

const style = "px-6 py-4 whitespace-no-wrap border-b border-gray-300";
const ApprovedKyc = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(<ViewInformation />);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openModal = (content?: any) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const dropDownData = [
    {
      title: (
        <p className="text-[#041549]" onClick={() => openModal(<ViewInformation />)}>
          View business user
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
      title: <p className="text-green-500"  onClick={() => openModal(<Toast />)}>Approve KYC</p>,
      icon: (
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.3534 1.01985L6.68669 7.68652C6.59269 7.78052 6.46536 7.83319 6.33336 7.83319C6.33269 7.83319 6.33202 7.83319 6.33136 7.83319C6.19802 7.83252 6.07069 7.77919 5.97669 7.68385L3.31002 4.97585C3.11602 4.77918 3.1187 4.46253 3.31536 4.26853C3.51203 4.0752 3.82936 4.07719 4.02269 4.27386L6.33536 6.62319L12.646 0.312516C12.8414 0.117182 13.158 0.117182 13.3534 0.312516C13.5487 0.507849 13.5487 0.825185 13.3534 1.01985ZM6.33336 5.16652C6.46136 5.16652 6.58936 5.11785 6.68669 5.01985L10.6867 1.01985C10.882 0.824519 10.882 0.507849 10.6867 0.312516C10.4914 0.117182 10.1747 0.117182 9.97936 0.312516L5.97936 4.31252C5.78402 4.50785 5.78402 4.82452 5.97936 5.01985C6.07736 5.11785 6.20536 5.16652 6.33336 5.16652ZM1.35602 4.27585C1.16269 4.07919 0.846031 4.07652 0.648697 4.27052C0.452031 4.46452 0.449357 4.78053 0.643357 4.97786L3.31002 7.68453C3.40736 7.78386 3.53669 7.83386 3.66602 7.83386C3.79269 7.83386 3.91936 7.78586 4.01669 7.68986C4.21336 7.49586 4.21603 7.17985 4.02203 6.98252L1.35602 4.27585Z"
            fill="#15A336"
          />
        </svg>
      ),
    },
    {
      title: <p className="text-[#EB0000]" onClick={() => openModal(<DeclineKYC />)}>Decline KYC</p>,
      icon: (
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.35317 8.64715C9.5485 8.84248 9.5485 9.15917 9.35317 9.35451C9.25583 9.45184 9.12783 9.50115 8.99983 9.50115C8.87183 9.50115 8.74383 9.45251 8.6465 9.35451L4.99983 5.70782L1.35317 9.35451C1.25583 9.45184 1.12783 9.50115 0.999833 9.50115C0.871833 9.50115 0.743833 9.45251 0.6465 9.35451C0.451167 9.15917 0.451167 8.84248 0.6465 8.64715L4.29317 5.0005L0.6465 1.35386C0.451167 1.15852 0.451167 0.841833 0.6465 0.6465C0.841833 0.451167 1.1585 0.451167 1.35384 0.6465L5.0005 4.29319L8.64716 0.6465C8.84249 0.451167 9.15916 0.451167 9.3545 0.6465C9.54983 0.841833 9.54983 1.15852 9.3545 1.35386L5.70783 5.0005L9.35317 8.64715Z"
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
                <h3 className="bg-aqua-100 text-aqua-300 rounded-full">
                  Approved
                </h3>
              </td>
              <td className={style}>
                <h3>{_.date}</h3>
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
        { modalContent }
      </Modal>
    </div>
  );
};

export default ApprovedKyc;
