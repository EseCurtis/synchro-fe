//@ts-nocheck
"use client";
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useTQuery } from "@/hooks/api/useTQuery";

const header = [
  "Business Name ",
  "Doc Type",
  "File Uploaded",
  "Status",
  "Date Approved",
  "",
];

const localizer = momentLocalizer(moment);

const ApprovedEvents = () => {
  const myEventsList = [
    {
      title: "Event 1",
      start: new Date(),
      end: new Date(),
    },
  ];

  const { data } = useTQuery({
    url: "/event/for-admin?status=approved&page=1&limit=10",
    queryKey: ["events", "approved-events"],
  });

  const eventsData = data?.data?.data;

  const events = eventsData?.map((event) => ({
    title: event?.name,
    start: new Date(event?.startTime),
    end: new Date(event?.endTime),
    event: event,
  }));

  return (
    <>
      <div
        style={{
          margin: "4em 0",
        }}
      >
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={(event) => {
            console.log(event);
          }}
          style={{ height: 500 }}
        />
      </div>
    </>
  );
};

export default ApprovedEvents;
