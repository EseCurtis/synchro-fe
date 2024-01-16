"use client";

import React, { Fragment } from "react";
import DefaultTable from "@/app/_components/table/defaultTable";
import { TABLE_STYLE } from "@/constant";
import { table } from "@/utils/contents/dummy/table";
import Image from "next/image";
import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import EventStat from "../components/userEventStat";
import { serviceViewData } from "../contents";
import { useState } from "react";
import Modal from "@/app/_components/popups/modal";
import ServiceDetails from "../components/user/service_details";
import { useParams } from "next/navigation";
import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import TablePagination from "@/app/_components/table/tablePagination";
import moment from "moment";
import Badge from "@/app/_components/forms/badge";

const header = ["Service", "Location", "Price", "Status", "Date"];

const ViewUserService = () => {
  const params = useParams();
  const id = params.id;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { data, fetchNextPage, isFetchingNextPage }: any = usePaginatedQuery({
    url: `event/user/${id}`,
    queryKey: ["services-wait", String(id)],
    enabled: true,
  });

  const services = data?.pages?.map((e: any) => e.data.data).flat() as any[];

  return (
    <div>
      <div className="flex gap-5 my-[4em] flex-wrap">
        {serviceViewData.map((_, index) => (
          <Fragment key={index}>
            <EventStat icon={_.icon} title={_.title} amount={_.amount} />
          </Fragment>
        ))}
      </div>

      <div className="my-[3em]">
        <DashboardAction />
        {/* @ts-ignore */}
        <DefaultTable header={header}>
          {services?.map((_, key: number) => {
            return (
              <tr key={key}>
                <td className={TABLE_STYLE}>
                  <div className="flex gap-5 items-center">
                    <div className="w-[5em] h-[3em] flex items-center justify-center bg-gray-500 rounded-md overflow-clip mt-1">
                      <Image src={_.image} width={140} height={100} alt="lll" />
                    </div>
                    <div>
                      <h3>{_.name}</h3>
                      <p className="text-second_primary_text text-sm">
                        @{_.name}
                      </p>
                    </div>
                  </div>
                </td>
                <td className={TABLE_STYLE}>
                  <h3>{_.location}</h3>
                </td>
                <td className={TABLE_STYLE}>
                  <h3>{_.price || "N/A"}</h3>
                </td>
                <td className={TABLE_STYLE}>
                <h3 className="text-[14px]">
                    <Badge
                      label={_.status}
                      status={
                        _.status === "approved" ? "Active" : "Inactive"
                      }
                    />
                  </h3>
                </td>
                <td className={TABLE_STYLE}>
                  <h3>{moment(_.date).format("MMM DD YYYY h:m:s")}</h3>
                </td>
                <td className={TABLE_STYLE}>
                  <Image
                    src="/images/icons/dashboard/table/more.svg"
                    width={32}
                    height={11}
                    alt=""
                    onClick={openModal}
                  />
                </td>
              </tr>
            );
          })}
        </DefaultTable>

        {services?.length > 0 ? (
          <TablePagination
            loading={isFetchingNextPage}
            onFetchMore={fetchNextPage}
          />
        ) : (
          <p className="pt-4 text-center">No data to display</p>
        )}

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ServiceDetails />
        </Modal>
      </div>
    </div>
  );
};

export default ViewUserService;
