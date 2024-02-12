//@ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useTQuery } from "@/hooks/api/useTQuery";
import CustomCalendar from "../components/CustomCalendar";
import {
  generateEventsMonthData,
  generateMonthData,
  getMonthName,
} from "@/helpers";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ApprovedEventsByDate from "./approvedByDate";

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
    data: event,
  }));

  const generativeFunction = (events, year) => {
    return generateMonthData(year);
    return generateEventsMonthData(events, year);
  };

  const [openedDate, setOpenedDate] = useState<boolean | number>(false);
  const [openedDateEvents, setOpenedDateEvents] = useState<any[]>(false);
  const [year, setYear] = useState<Date>(2023);
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [yearlyData, setYearlyData] = useState<any[]>(
    generativeFunction(events, year)
  );
  const [monthlyData, setMonthlyData] = useState<{
    month: string;
    days: number[];
  }>(yearlyData[month]);

  const monthSwitch = {
    canPrev: month >= 0,
    canNext: month < yearlyData.length,
    next: () => monthSwitch.canNext && setMonth(month + 1),
    prev: () => monthSwitch.canPrev && setMonth(month - 1),
  };

  const dateOpen = {
    open: (day: number, events: any[]) => {
      setOpenedDate(day)
      setOpenedDateEvents(events)
    },
    close: () => setOpenedDate(false),
  };

  useEffect(() => {
    setYearlyData(
      generativeFunction(events, year) || generativeFunction(events)
    );
  }, [year]);
  useEffect(() => {
    setMonthlyData(yearlyData[month] || yearlyData[0]);
  }, [yearlyData, month]);

  return openedDate ? (
    <ApprovedEventsByDate events={openedDateEvents} actions={dateOpen}/>
  ) : (
    <>
      <div
        style={{
          margin: "4em 0",
        }}
      >
        <div className="pb-7 flex items-center justify-between">
          <div className="flex  items-center gap-4 ">
            <div className="flex gap-3">
              <FaChevronLeft
                onClick={monthSwitch.prev}
                className={`${
                  !monthSwitch.canPrev && "opacity-30 cursor-default"
                } hover:opacity-50 cursor-pointer`}
              />
              <FaChevronRight
                onClick={monthSwitch.next}
                className={`${
                  !monthSwitch.canNext && "opacity-30 cursor-default"
                } hover:opacity-50 cursor-pointer`}
              />
            </div>
            <h3 className="font-bold">
              {getMonthName(monthlyData?.month)} {year}
            </h3>
          </div>

          <select name="" id="" onChange={(e) => setYear(e.target.value)}>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>
        <CustomCalendar
          rangeData={{ month, year }}
          days={monthlyData?.days}
          events={events}
          dateOpenActions={dateOpen}
        />
      </div>
    </>
  );
};

export default ApprovedEvents;
