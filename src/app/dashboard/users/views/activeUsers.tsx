/* eslint-disable @next/next/no-img-element */
"use client";
import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import DefaultTable from "@/app/_components/table/defaultTable";
import TablePagination from "@/app/_components/table/tablePagination";
import React, { Fragment, useEffect } from "react";
import Image from "../../../../../node_modules/next/image";
import Link from "next/link";
import Dropdown from "@/app/_components/popups/dropDown";
import { useState } from "react";
import Modal from "@/app/_components/popups/modal";
import SuspendUser from "../components/suspendUser";
import { useTQuery } from "@/hooks/api/useTQuery";
import moment from "moment";
import { Spinner } from "@/app/_components/spinner/Spinner";
import { useRouter } from "next/navigation";
import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";

const header = [
  "Fullname ",
  "Username",
  "Gender",
  "Phone Number",
  "Last Active",
  "Actions",
];

const style = "px-6 py-4 whitespace-no-wrap border-b border-gray-300";
const ActiveUsers = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<any>();
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openModal = (content: any) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setIsModalOpen(false);
  };

  const { push } = useRouter();

  const dropDownData = (user: any) => {
    return [
      {
        title: (
          <p
            className="text-[#041549]"
            onClick={() => push(`/dashboard/users/${user.id}`)}
          >
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
        title: (
          <p
            className="text-[#F2994A]"
            onClick={() =>
              openModal(<SuspendUser user={user} onClose={closeModal} />)
            }
          >
            Suspend User
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
    ];
  };

  const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    usePaginatedQuery({
      url: "/user/admin/users?suspended=false",
      queryKey: ["users", "active-users"],
      enabled: true,
    });

  const users = data?.pages?.map((e: any) => e.data.data).flat() as any[];
  useEffect(() => {
    setFilteredUsers(users);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <DashboardAction
        pool={users}
        setMatch={setFilteredUsers}
        matchQuery={["firstName", "username"]}
      />
      {/* @ts-ignore */}
      <DefaultTable header={header}>
        {filteredUsers?.map((_, key: number) => {
          return (
            <tr key={key} className="text-sm">
              <td
                className={`${style} cursor-pointer`}
                onClick={() => {
                  push(`/dashboard/users/${_?.id}`);
                }}
              >
                <div className="flex gap-5 items-center">
                  {_?.profileImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={_?.profileImage}
                      className="w-[3em] h-[3em] bg-gray-500 rounded-full object-cover"
                      alt=""
                    />
                  ) : (
                    <div className="w-[3em] h-[3em] bg-gray-500 rounded-full"></div>
                  )}
                  <div>
                    <h3>{_?.firstName ?? _?.username}</h3>
                    <p className="text-second_primary_text">{_.email}</p>
                  </div>
                </div>
              </td>
              <td className={style}>
                <h3>{_.username}</h3>
              </td>
              <td className={style}>
                <h3>{_.gender ?? "N/A"}</h3>
              </td>
              <td className={style}>
                <h3>{_.phone ?? "N/A"}</h3>
              </td>
              <td className={style}>
                <h3>{moment(_.last_login).format("MMM ddd YYYY")}</h3>
              </td>
              <td className={style}>
                <Dropdown
                  view={
                    <div className="w-10 h-10">
                      <img
                        src="/images/icons/dashboard/table/more.svg"
                        alt=""
                        onClick={toggleDropdown}
                        className="w-8 h-8"
                      />
                    </div>
                  }
                >
                  {dropDownData(_).map(({ title, icon }, index) => (
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

      <TablePagination
        loading={isFetchingNextPage}
        onFetchMore={() => {
          fetchNextPage();
        }}
      />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div>{modalContent}</div>
      </Modal>
    </div>
  );
};

export default ActiveUsers;
