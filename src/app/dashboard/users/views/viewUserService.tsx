"use client";

import ModalTabButton from "@/app/_components/button/modalTabButton";
import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import Badge from "@/app/_components/forms/badge";
import Modal from "@/app/_components/popups/modal";
import DefaultTable from "@/app/_components/table/defaultTable";
import NoData from "@/app/_components/table/NoData";
import TablePagination from "@/app/_components/table/tablePagination";
import { TABLE_STYLE } from "@/constant";
import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import { TStringIndexObject } from "@/utils/types";
import moment from "moment";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import EventStat from "../components/userEventStat";
import { serviceViewData } from "../contents";

const header = ["Service", "Location", "Price", "Status", "Date"];

const ViewUserService = () => {
  const params = useParams();
  const id = params.id;

  const bookedServices: any = usePaginatedQuery({
    url: `/admin/users/${id}/bookings?type=service`,
    queryKey: ["services-wait-x", String(id)],
    enabled: true,
  });
  const createdServices: any = usePaginatedQuery({
    url: `/admin/users/${id}/services`,
    queryKey: ["user-services-x", String(id)],
    enabled: true,
  });

  const tabDatas: TStringIndexObject = {
    "Booked services": {
      response: bookedServices,
      data: bookedServices?.data?.pages
        ?.map((e: any) => e.data.data)
        .flat() as any[],
    },
    "Created services": {
      response: createdServices,
      data: createdServices?.data?.pages
      ?.map((e: any) => e.data.data)
      .flat() as any[],
    },
  };

  const [activeTab, setActiveTab] = useState("");
  const [activeTabData, setActiveTabData] = useState<any>(tabDatas[activeTab]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setActiveTabData(tabDatas[activeTab]);
  }, [activeTab]);

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
        <div className="flex gap-3">
          {["Booked services", "Created services"].map((_: any, i) => (
            <Fragment key={i}>
              <ModalTabButton
                label={_}
                isActive={activeTab == _}
                customClass="px-[20px!important]"
                onClick={() => {
                  setActiveTab(_);
                }}
              />
            </Fragment>
          ))}
        </div>

        {activeTabData?.data?.length > 0 ? (
          <>
            <DashboardAction />
            {/* @ts-ignore */}
            <DefaultTable header={header}>
              {activeTabData?.data?.map((serviceInfo: any, key: number) => {
                const  _ = serviceInfo?.service;
                _.image = JSON.parse(_.images[0])?.url
                return (
                  <tr key={key}>
                    <td className={TABLE_STYLE}>
                      <div className="flex gap-5 items-center">
                        <div className="w-[5em] h-[3em] flex items-center justify-center bg-gray-500 rounded-md overflow-clip mt-1">
                          <Image
                            src={_.image}
                            width={140}
                            height={100}
                            alt="lll"
                          />
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
                      <h3>{_?.location}</h3>
                    </td>
                    <td className={TABLE_STYLE}>
                      <h3>{_?.price || "N/A"}</h3>
                    </td>
                    <td className={TABLE_STYLE}>
                      <h3 className="text-[14px]">
                        <Badge
                          label={_.status}
                          status={
                            _?.status === "approved" ? "Active" : "Inactive"
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

            <TablePagination
              loading={activeTabData?.response?.isFetchingNextPage}
              onFetchMore={activeTabData?.response?.fetchNextPage}
            />
          </>
        ) : (
          <NoData/>
        )}

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {/* <ServiceDetails data={{}} /> */}
          <></>
        </Modal>
      </div>
    </div>
  );
};

export default ViewUserService;
