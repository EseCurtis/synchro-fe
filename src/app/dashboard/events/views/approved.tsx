//@ts-nocheck
"use client";
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

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

  return (
    <>
      <div
        style={{
          margin: "4em 0",
        }}
      >
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </>
  );
};

export default ApprovedEvents;
