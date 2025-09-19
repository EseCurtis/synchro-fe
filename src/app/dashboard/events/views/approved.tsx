//@ts-nocheck
"use client";
import {
  generateEventsMonthData,
  generateMonthData,
  getMonthName,
} from "@/helpers";
import { useApprovedEvents } from "@/hooks/api/v2/events";
import { generateYearsOptions } from "@/v2/helpers/common.helpers";
import { Event } from "@/v2/types/event.types";
import moment from "moment";
import { useEffect, useState } from "react";
import { momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CustomCalendar from "../components/CustomCalendar";
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

  const { data } = useApprovedEvents();

  const eventsData = data?.data?.data;

  const events = eventsData?.map((event: Event) => ({
    title: event?.name,
    start: new Date(event?.startDateTime),
    end: new Date(event?.endDateTime),
    data: event,
  }));

  console.log("TUARY=>>",events);

  const generativeFunction = (events, year) => {
    return generateMonthData(year);
    return generateEventsMonthData(events, year);
  };

   //2 year priroor to current yer and 2 years afterwards
  const yearsOptions = generateYearsOptions(3);
  const [openedDate, setOpenedDate] = useState<boolean | number>(false);
  const [openedDateEvents, setOpenedDateEvents] = useState<any[]>(false);
  const [year, setYear] = useState<Date>(yearsOptions[3].value);
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [yearlyData, setYearlyData] = useState<any[]>(
    generativeFunction(events, year)
  );
  const [monthlyData, setMonthlyData] = useState<{
    month: string;
    days: number[];
  }>(yearlyData[month]);

  const monthSwitch = {
    canPrev: month > 0,
    canNext: month < yearlyData.length - 1,
    next: () => monthSwitch.canNext && setMonth(month + 1),
    prev: () => monthSwitch.canPrev && setMonth(month - 1),
  };

  const dateOpen = {
    open: (day: number, events: any[]) => {
      setOpenedDate(day);
      setOpenedDateEvents(events);
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
    <ApprovedEventsByDate events={openedDateEvents} actions={dateOpen} />
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
            {yearsOptions.map((yearOpt) => (
              <option
                value={yearOpt.value}
                selected={yearOpt.isCurrent ? true : false}
                key={yearOpt.value}
              >
                {yearOpt.label}
              </option>
            ))}
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
