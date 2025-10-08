"use client";
import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import Dropdown from "@/app/_components/popups/dropDown";
import Modal from "@/app/_components/popups/modal";
import DefaultTable from "@/app/_components/table/defaultTable";
import TablePagination from "@/app/_components/table/tablePagination";
import { useApprovedKycBusinesses } from "@/hooks/api/v2/kyc";
import { UserAvatarV2 } from "@/v2/components/common/avatar.component";
import { BusinessTypeV2 } from "@/v2/types/user.types";
import moment from "moment";
import Image from "next/image";
import { Fragment, useState } from "react";
import LegalDoc from "../components/legal_doc";
import ViewInformation from "../components/viewInfo";

const header = [
  "Business Name ",
  "Category",
  "File Upload",
  "Date Submitted",
  "Actions",
];

const style = "px-6 py-4 whitespace-no-wrap border-b border-gray-300";

const ApprovedKyc = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [search, setSearch] = useState("");

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

  const {
    data,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = useApprovedKycBusinesses({ search });

  // @ts-ignore
  const businesses = data?.pages?.map((e: any) => e.data.data).flat() as any[];

  const dropDownData = (business: any) => [
    {
      title: (
        <p
          className="text-[#041549]"
          onClick={() =>
            openModal(
              <ViewInformation business={business} onClose={closeModal} />
            )
          }
        >
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
  ];

  return (
    <div>
      <DashboardAction
        isLoading={isFetching}
        onChangeText={setSearch}
        textValue={search}
      />
      {/* @ts-ignore */}
      <DefaultTable header={header}>
        {businesses?.map((_: BusinessTypeV2, key: number) => {
          const userWithProfile = {
            ..._.user,
            profiles: [
              {
                ..._,
                user: undefined,
              },
            ],
          };
          return (
            <tr key={key}>
              <td className={style}>
                <div className="flex gap-5 items-center">
                  <div className="w-[3em] h-[3em] bg-gray-500 rounded-full">
                    <UserAvatarV2 user={userWithProfile} />
                  </div>
                  <div>
                    <h3>{_.businessName}</h3>
                  </div>
                </div>
              </td>
              <td className={style}>
                <h3>{_?.businessCategory?.name}</h3>
              </td>
              <td className={style}>
                {!_?.kycDocument ? (
                  <div>
                    <span
                      className="bg-yellow-400/20 whitespace-nowrap text-yellow-600 p-2 rounded-lg text-xs cursor-pointer"
                      onClick={() => openModal(<LegalDoc business={_} />)}
                    >
                      No Legal Document
                    </span>
                  </div>
                ) : (
                  <h3
                    className="underline cursor-pointer"
                    onClick={() => openModal(<LegalDoc business={_} />)}
                  >
                    Legal Document.pdf..
                  </h3>
                )}
              </td>
              <td className={style}>
                <h3>{moment(_?.createdAt).format("MMM DD YYYY")}</h3>
              </td>
              <td className={style}>
                <Dropdown
                  view={
                    <Image
                      src="/images/icons/dashboard/table/more.svg"
                      width={30}
                      height={30}
                      alt=""
                      onClick={toggleDropdown}
                    />
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
      {businesses?.length > 0 ? (
        <>
          {hasNextPage && (
            <TablePagination
              onFetchMore={fetchNextPage}
              loading={isFetchingNextPage}
            />
          )}
        </>
      ) : (
        <p className="pt-4 text-center">No data to display</p>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default ApprovedKyc;
