"use client";
import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import Modal from "@/app/_components/popups/modal";
import DefaultTable from "@/app/_components/table/defaultTable";
import NoData from "@/app/_components/table/NoData";
import { Event } from "@/v2/types/event.types";
import { Fragment, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import EventDetails from "../../users/components/user/event_details";
import EventsCreated from "../../users/views/EventTables/EventsCreated";

const header = [
  "Event Title ",
  "Category",
  "Location",
  "Date Created",
  "Actions",
];

const ApprovedEventsByDate = ({
  events,
  actions,
}: {
  events: any;
  actions: {
    open: (day: boolean | number, events: any[]) => void;
    close: () => void;
  };
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const openModal = (event: any) => {
    setIsModalOpen(true);
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log("rhido!", events);
  }, [events]);

  return (
    <div>
      {events?.length > 0 ? (
        <>
          <div className="flex">
            <span
              className="flex gap-2 p-2 border text-sm rounded-lg items-center cursor-pointer text-slate-400/80 hover:opacity-70"
              onClick={actions.close}
            >
              <FaChevronLeft />
              Go Back
            </span>
          </div>{" "}
          <DashboardAction />
          <DefaultTable header={header as []}>
            {events?.map((_: any, key: number) => {
              return (
                <Fragment key={key}>
                  <EventsCreated _={_.data} openModal={openModal} />
                </Fragment>
              );
            })}
          </DefaultTable>
        </>
      ) : (
        <NoData />
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedEvent && <EventDetails event={selectedEvent} />}
      </Modal>
    </div>
  );
};

export default ApprovedEventsByDate;
