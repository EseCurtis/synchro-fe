import { filterEventsByDate, getDayName } from "@/helpers";
import Image from "next/image";
import { Fragment } from "react";

interface ICustomCalendar {
  days: number[];
  events: [];
  rangeData: { month: number; year: number };
}
interface ICalendarUnitItem {
  unitValue: string | number;
  events: any[];
}

const CalendarUnitItem: React.FC<ICalendarUnitItem> = ({
  unitValue,
  events,
}) => {
  const matchedEvents = events || [];
  const slicedEvents = matchedEvents.slice(0, 5);
  return (
    <div className="col-span-1 h-[120px] border border-[#EDEFF5]">
      <div className="flex w-full h-full items-center gap-3 flex-col p-3">
        <span className="text-xs">{unitValue}</span>
        <div className="flex justify-center items-center mt-4">
          {slicedEvents?.map(({ data, title }, key) => (
            <Fragment key={key}>
              <div className="w-5 h-7 scale-110">
                <div
                  className={`w-7 h-7 bg-gray-400 rounded-full border border-white overflow-clip`}
                >
                  <Image
                    src={data.image}
                    width={28}
                    height={28}
                    alt={title}
                    priority
                  />
                </div>
              </div>
            </Fragment>
          ))}
        </div>
        {matchedEvents.length > slicedEvents.length && (
          <p className="text-xs">
            +{matchedEvents.length - slicedEvents.length} events
          </p>
        )}
      </div>
    </div>
  );
};

const CustomCalendar: React.FC<ICustomCalendar> = ({
  days,
  events,
  rangeData,
}) => {
  return (
    <div className="grid grid-cols-7 w-full h-full">
      {days?.slice(0, 7)?.map((day) => (
        <Fragment key={day}>
          <div className="col-span-1 text-center py-2">
            <p>{getDayName(day-1)}</p>
          </div>
        </Fragment>
      ))}
      {days?.map((item, key) => (
        <Fragment key={key}>
          <CalendarUnitItem
            unitValue={item}
            events={filterEventsByDate({ day: item, ...rangeData }, events)}
          />
        </Fragment>
      ))}
    </div>
  );
};

export default CustomCalendar;
