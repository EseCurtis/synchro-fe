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
import { useTQuery } from "@/hooks/api/useTQuery";
import Link from "next/link";
import moment from "moment";
import { useTMutation } from "@/hooks/api/useTMutation";
import { Spinner } from "@/app/_components/spinner/Spinner";
import { useQueryClient } from "@tanstack/react-query";

const header = ["Business Name ", "User", "Category", "Date", "", ""];
const style = "px-6 py-4 whitespace-no-wrap border-b border-gray-300";
const PendingEvents = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const client = useQueryClient();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { data, refetch } = useTQuery({
    url: "/event/for-admin?status=pending&page=1&limit=10",
    queryKey: ["events", "pending-events"],
  });

  const { isLoading, mutate } = useTMutation({
    url: "/event/admin/update-status",
    method: "put",
    options: {
      onSuccess() {
        refetch();
        client.invalidateQueries(["events"]);
      },
    },
  });

  // @ts-ignore
  const events = data?.data?.data;

  const dropDownData = [
    {
      title: (
        <p className="text-[#041549]" onClick={openModal}>
          View Event
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
  ];

  return (
    <div>
      <DashboardAction />
      {/* @ts-ignore */}
      <DefaultTable header={header}>
        {events?.map((_: any, key: number) => {
          return (
            <tr key={key}>
              <td className={style}>
                <div className="flex gap-5 items-center">
                  <img
                    src={_?.image}
                    className="w-[3em] h-[3em] bg-gray-500 rounded-full object-cover"
                  ></img>
                  <div>
                    <h3>{_.name}</h3>
                  </div>
                </div>
              </td>
              <td className={style}>
                <Link href={`/dashboard/users/${_?.user?.id}`}>
                  <h3 className="underline">{_?.user?.username}</h3>
                </Link>
              </td>
              <td className={style}>
                <h3>{_?.eventCategory?.name}</h3>
              </td>
              <td className={style}>
                <h3>{moment(_?.startTime).format("MMM DD YYYY")}</h3>
              </td>
              <td className={`whitespace-no-wrap border-b border-gray-300`}>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <div className="flex items-center justify-space-around">
                    <button
                      onClick={() => {
                        mutate({ eventId: _?.id, status: "approved" });
                      }}
                    >
                      <Image
                        src="/images/icons/dashboard/table/tick.svg"
                        width={80}
                        height={80}
                        alt=""
                      />
                    </button>

                    <button
                      onClick={() => {
                        mutate({ eventId: _?.id, status: "rejected" });
                      }}
                    >
                      <Image
                        src="/images/icons/dashboard/table/times.svg"
                        width={80}
                        height={80}
                        alt=""
                      />
                    </button>
                  </div>
                )}
              </td>
              <td className={style}>
                <Dropdown
                  view={
                    <Image
                      src="/images/icons/dashboard/table/more.svg"
                      width={30}
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
