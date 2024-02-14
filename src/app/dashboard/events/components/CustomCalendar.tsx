import { filterEventsByDate, getDayName } from "@/helpers";
import Image from "next/image";
import { Fragment } from "react";

interface ICustomCalendar {
  days: number[];
  events: [];
  rangeData: { month: number; year: number };
  dateOpenActions: { open: (day: boolean | number, events: any[])=>void, close: ()=>void}
}
interface ICalendarUnitItem {
  unitValue: string | number;
  events: any[];
  actions: { open: (day: boolean | number, events: any[])=>void, close: ()=>void};
}

const CalendarUnitItem: React.FC<ICalendarUnitItem> = ({
  unitValue,
  events,
  actions
}) => {
  const matchedEvents = events || [];
  const slicedEvents = matchedEvents.slice(0, 5);
  return (
    <div className="col-span-1 h-[120px] border border-[#EDEFF5]">
      <div className="flex w-full h-full items-center gap-3 flex-col p-3">
        <span className="text-xs">{unitValue}</span>
        <div className="flex justify-center items-center mt-4 cursor-pointer" onClick={()=> actions.open(unitValue as number, matchedEvents)}>
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
  dateOpenActions,
}) => {
  return (
    <div className="grid grid-cols-7 w-full h-full border-l border-r">
      {days?.slice(1, 8)?.map((day) => (
        <Fragment key={day}>
          <div className="col-span-1 text-center py-2 border-t ">
            <p>{getDayName(day, rangeData.month, rangeData.year)}</p>
          </div>
        </Fragment>
      ))}
      {days?.map((item, key) => (
        <Fragment key={key}>
          <CalendarUnitItem
            unitValue={item}
            events={filterEventsByDate({ day: item, ...rangeData }, events)}
            actions={dateOpenActions}
          />
        </Fragment>
      ))}
    </div>
  );
};

export default CustomCalendar;
