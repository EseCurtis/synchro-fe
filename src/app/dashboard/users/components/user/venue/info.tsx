import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { BiCalendar, BiInfoCircle, BiMapPin, BiTime } from "react-icons/bi";

const Availability = ({ hours }: any) => {
  hours = hours.map((hour: any) => {
    const parsedHour = JSON.parse(hour);
    const startDate = moment(parsedHour.times[0].from);
    const endDate = moment(parsedHour.times[parsedHour.times.length - 1].to);
    return `${startDate.format("MMMM Do")} - ${endDate.format("Do, YYYY")}`;
  });

  return (
    <div className="grid gap-3 mt-6">
      <h4 className="flex items-center gap-2">
        <BiMapPin /> Availability
      </h4>
      <div className="flex flex-col gap-2">
        {hours.map((hour: any, i: number) => {
          return (
            <Fragment key={i}>
              <p className="flex gap-3">
                <span>{hour}</span>
              </p>
            </Fragment>
          );
        })}
      </div>
      <div className="flex h-[150px] w-[100%] rounded bg-gray-300"></div>
    </div>
  );
};

const Info = ({ venue }: any) => {
  const [showMore, setShowMore] = useState(false);
  const [data, setData] = useState(venue);

  useEffect(() => {
    setData(venue);
  }, [venue]);

  return (
    <div>
      <div className="grid gap-3 mt-6">
        <h4 className="flex items-center gap-2">
          <BiInfoCircle /> About
        </h4>
        <p>{data?.description}</p>
      </div>

      <div className="grid gap-3 mt-6">
        <h4 className="flex items-center gap-2">
          <BiMapPin /> Location
        </h4>
        <p>{data?.address}</p>
        <div className="flex h-[150px] w-[100%] rounded bg-gray-300"></div>
      </div>

      <div className="grid gap-3 mt-6">
        <h4 className="flex items-center gap-2">Pricing</h4>
        <div className="grid grid-cols-2">
          <div className="flex items-center gap-3">
            <BiTime />
            <div className="grid">
              <p className="text-sm text-gray-400">Hourly</p>
              <p>${data?.hourlyRate}/hr</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <BiCalendar />
            <div className="grid">
              <p className="text-sm text-gray-400">Daily</p>
              <p>${data?.dailyRate}/day</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`${showMore ? "flex" : "hidden"} flex-col`}>
        {data?.hours && <Availability hours={data?.hours} />}
      </div>

      <div className="text-center mt-7">
        <h3 className="font-bold cursor-pointer" onClick={() => setShowMore(!showMore)}>
          {showMore ? "Show less" : "Show more details"}
        </h3>
      </div>
    </div>
  );
};

export default Info;
