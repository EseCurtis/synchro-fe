"use client";
import { Button } from "@/app/_components/button";
import Badge from "@/app/_components/forms/badge";
import EventsSkeleton from "@/app/_components/skeleton/EventsSkeleton";
import { generateMonthData, getMonthName } from "@/helpers";
import { useApprovedEventsByDate } from "@/hooks/api/v2";
import { generateYearsOptions } from "@/v2/helpers/common.helpers";
import { Event } from "@/v2/types/event.types";
import { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CustomCalendar from "../components/CustomCalendar";
import ApprovedEventsByDate from "./approvedByDate";

const generativeFunction = (events: any, year: any) => {
  return generateMonthData(year);
};

const ApprovedEventsCalendar = () => {
  //2 year priroor to current yer and 2 years afterwards
  const yearsOptions = generateYearsOptions(3);
  const [openedDate, setOpenedDate] = useState<boolean | number>(false);
  const [openedDateEvents, setOpenedDateEvents] = useState<any[]>([]);
  const [year, setYear] = useState<Date>(yearsOptions[3].value as any);
  const [month, setMonth] = useState<number>(new Date().getMonth());

  const { data, isFetching, isLoading, error } = useApprovedEventsByDate({
    fromDate: new Date(Number(year), month, 1).getTime(),
    toDate: new Date(Number(year), month + 1, 0).getTime(),
  });

  const eventsData = (data as any)?.data?.data;

  const events = eventsData?.map((event: Event) => ({
    title: event?.name,
    start: new Date(event?.startDateTime),
    end: new Date(event?.endDateTime),
    data: event,
  }));

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
    setYearlyData(generativeFunction(events, year));
  }, [year]);
  useEffect(() => {
    setMonthlyData(yearlyData[month] || yearlyData[0]);
  }, [yearlyData, month]);

  // Show skeleton loader while loading
  if (isLoading || isFetching) {
    return <EventsSkeleton showCalendar={true} />;
  }

  return openedDate ? (
    <ApprovedEventsByDate events={openedDateEvents} actions={dateOpen as any} />
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
              {getMonthName(month as any)}  {year as any}
            </h3>
            {error ? (
              <div>
                <Badge status="Inactive" label="Error Loading Events" />{" "}
                <Button >Retry</Button>
              </div>
            ) : (
              <></>
            )}
          </div>

          <select
            name=""
            id=""
            onChange={(e) => setYear(e.target.value as any)}
          >
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
          rangeData={{ month, year } as any}
          days={monthlyData?.days}
          events={events}
          dateOpenActions={dateOpen as any}
        />
      </div>
    </>
  );
};

export default ApprovedEventsCalendar;
