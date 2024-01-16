import moment from "moment";
import Image from "next/image";
import { Fragment, ReactNode, useEffect, useState } from "react";
import {
  BiArrowToBottom,
  BiBook,
  BiCalendar,
  BiInfoCircle,
  BiMapPin,
  BiTime,
} from "react-icons/bi";
import {
  FaWifi,
  FaCar,
  FaVideo,
  FaTv,
  FaBus,
  FaRestroom,
  FaTree,
  FaShieldAlt,
  FaScrewdriver,
  FaAccessibleIcon,
  FaStreetView,
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa";

const ExpandingInfo = ({
  label,
  icon,
  children,
}: {
  label: ReactNode | string;
  icon: ReactNode;
  children: ReactNode;
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="p-3 mt-7 border border-gray-300 rounded-lg transition-[4s]">
      <div className="flex gap-2 text-sm items-center relative">
        <span className="flex items-center justify-center rounded-full p-2 bg-gray-700/20">
          {icon}
        </span>
        {label}

        <i className="absolute p-1 bg-gray-700/20 right-0 text-[10px] rounded-full cursor-pointer" onClick={() => setExpanded(!expanded)}>
          {expanded ? <FaArrowUp /> : <FaArrowDown />}
        </i>
      </div>
      <div className={`${expanded ? "h-full pt-4" : "h-0"} transition-[0.4s] overflow-clip px-2 text-sm`}>{children}</div>
    </div>
  );
};

const getAmenityIcon = (amenity: string) => {
  switch (amenity) {
    case "Wifi":
      return <FaWifi />;
    case "Parking space(s)":
      return <FaCar />;
    case "Projector":
      return <FaVideo />;
    case "TV":
      return <FaTv />;
    case "Public transportation":
      return <FaBus />;
    case "Restrooms":
      return <FaRestroom />;
    case "Outdoor area":
      return <FaTree />;
    case "Security":
      return <FaShieldAlt />;
    case "Janitorial services":
      return <FaScrewdriver />;
    case "Wheelchair accessible":
      return <FaAccessibleIcon />;
    case "Street level access":
      return <FaStreetView />;
    default:
      return null; // You can return a default icon or handle the case as needed
  }
};

const Availability = ({ hours }: any) => {
  hours = hours.map((hour: any) => {
    const parsedHour = JSON.parse(hour);
    const startDate = moment(parsedHour.times[0].from);
    const endDate = moment(parsedHour.times[parsedHour.times.length - 1].to);
    return `${startDate.format("MMMM: Do")} - ${endDate.format("Do, YYYY")}`;
  });

  return (
    <div className="grid gap-3 mt-6">
      <h4 className="flex items-center gap-2">Availability</h4>
      <div className="unordered-list list-disc">
        {hours.map((hour: any, i: number) => {
          return (
            <Fragment key={i}>
              <li className="flex gap-3 text-sm">• {hour}</li>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

const Ammenities = ({ ammenities }: { ammenities: string[] }) => {
  return (
    <div className="mt-6">
      <h4 className="flex items-center gap-2">Amenities</h4>
      {ammenities && (
        <div className="grid grid-cols-2 pt-5 gap-y-3">
          {ammenities.map((_: string, i: number) => {
            const icon = getAmenityIcon(_);
            return (
              <Fragment key={i}>
                <span className="flex gap-2">
                  {icon}
                  <span className="text-xs">{_}</span>
                </span>
              </Fragment>
            );
          })}
        </div>
      )}
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
        <div className="flex h-[auto] w-[100%] rounded-lg bg-gray-300">
          <Image
            className="w-[300%] h-[100%]"
            src={"/images/map-dummy-location.svg"}
            alt="location map"
            width={550}
            height={100}
          />
        </div>
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

      <div className={`${showMore ? "h-full" : "h-0"} overflow-clip transition-[0.4s] flex-col`}>
        <Availability hours={data?.hours} />
        <Ammenities ammenities={data?.amenities} />
        <ExpandingInfo icon={<BiBook />} label={"Venue Rules"}>
          {data?.rules}
        </ExpandingInfo>
        <ExpandingInfo icon={<BiBook />} label={"Cancellation Policy"}>
          {data?.cancellationPolicy}
        </ExpandingInfo>
      </div>

      <div className="text-center mt-7 flex items-center justify-center">
        <h3
          className="font-bold cursor-pointer border border-gray-300 m-auto w-auto py-3 px-7 rounded-lg"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show less" : "Show more details"}
        </h3>
      </div>
    </div>
  );
};

export default Info;
