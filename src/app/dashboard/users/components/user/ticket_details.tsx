import customStyles from "@/app/_components/customStyles/index.module.css";
import Badge from "@/app/_components/forms/badge";
import moment from "moment";
import { ReactNode } from "react";
import {
  FaCalendar,
  FaGlassWhiskey,
  FaMapPin,
  FaQuestionCircle,
  FaTicketAlt,
  FaUser,
} from "react-icons/fa";

interface Event {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  image: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  isPrivate: boolean;
  status: any;
  // Add other properties as needed
}

interface User {
  id: string;
  firstName: string;
}

interface EventTicket {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  quantity: number;
  availableQuantity: number;
  currency: string;
  currencyLabel: string;
  price: string;
  eventId: string;
  event: Event;
}

interface TicketDetailsProps {
  data: {
    eventTicket?: EventTicket;
    user: User;
  };
  openEvent?: any;
}

const hugIcon = (
  <svg
    width="29"
    height="29"
    viewBox="0 0 29 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="29" height="29" rx="14.5" fill="#EDF2F7" />
    <path
      d="M13.8393 13.6667C12.2766 13.6667 11.006 12.3953 11.006 10.8333C11.006 9.27133 12.2766 8 13.8393 8C15.402 8 16.6726 9.27133 16.6726 10.8333C16.6726 12.3953 15.402 13.6667 13.8393 13.6667ZM13.8393 9C12.828 9 12.006 9.822 12.006 10.8333C12.006 11.8447 12.828 12.6667 13.8393 12.6667C14.8506 12.6667 15.6726 11.8447 15.6726 10.8333C15.6726 9.822 14.85 9 13.8393 9ZM16.3333 20.5C16.3333 20.224 16.1093 20 15.8333 20H11.1666C10.1153 20 9.66663 19.5553 9.66663 18.5133C9.66663 17.846 9.87129 15.6667 12.5 15.6667H15.1666C16.2573 15.6667 17.0487 16.038 17.5193 16.77C17.6687 17.0027 17.9779 17.07 18.2099 16.9207C18.4426 16.7713 18.5093 16.462 18.3606 16.23C17.902 15.5166 16.9766 14.6667 15.1666 14.6667H12.5C9.67063 14.6667 8.66663 16.7387 8.66663 18.5133C8.66663 20.1167 9.55463 21 11.1666 21H15.8333C16.1093 21 16.3333 20.776 16.3333 20.5ZM19.0753 20.6313L20.8533 18.8534C21.0486 18.658 21.0486 18.3413 20.8533 18.146C20.658 17.9507 20.3413 17.9507 20.146 18.146L18.7213 19.57L18.186 19.0347C17.9907 18.8393 17.674 18.8393 17.4786 19.0347C17.2833 19.23 17.2833 19.5467 17.4786 19.742L18.3673 20.6307C18.4646 20.728 18.5927 20.7773 18.7207 20.7773C18.8487 20.7773 18.978 20.7287 19.0753 20.6313Z"
      fill="#1A202C"
    />
  </svg>
);

const InfoSpan = ({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) => {
  return (
    <div className="flex items-center gap-3">
      <span className="bg-gray-300/50 w-[29px] h-[29px] rounded-full flex items-center justify-center">
        {icon}
      </span>
      <span className="text-sm text-gray-500">
        <span className="text-[11px] text-gray-500">{children}</span>
      </span>
    </div>
  );
};

const TicketDetails = ({ data, openEvent }: TicketDetailsProps) => {
  const eventTicket = data?.eventTicket;
  const event = data?.eventTicket?.event;
  const user = data?.user;

  const startTime = moment(event?.startTime).format("h:mm A");
  const endTime = moment(event?.endTime).format("h:mm A");
  const monthYear = moment(event?.date).format("MMMM YYYY");

  const formattedTimeRange = `${startTime} - ${endTime} ${monthYear}`;

 // console.log("Dayat", data);

  return (
    <div>
      <div className="font-bold text-center">Ticket details</div>

      <div
        className={`mt-2 py-5 overflow-y-scroll max-h-[70vh] ${customStyles.customScrollbar}`}
      >
        <div className=" rounded w-[100%]  relative flex flex-col gap-3 text-center items-center">
          <img src={"/images/qr-code.svg"} alt="qr-code" width={337} height={278} />
          <b className="pt-3">
            {event?.name}
          </b>
          <div onClick={openEvent} className="cursor-pointer bg-gray-300 p-2 px-4 rounded-full text-xs">
            View Event
          </div>
        </div>

        <div className="flex flex-col mt-10 w-[100%] gap-2 ">
          <InfoSpan icon={hugIcon}>
            Host: <u>{user?.firstName}</u>
          </InfoSpan>
          <InfoSpan icon={<FaGlassWhiskey />}>{event?.name}</InfoSpan>
          <InfoSpan icon={<FaUser />}>
            {event?.isPrivate ? "Private" : "Public"} event
          </InfoSpan>
          <InfoSpan icon={<FaCalendar />}>{formattedTimeRange}</InfoSpan>
          <InfoSpan icon={<FaMapPin />}>{event?.location}</InfoSpan>
          <InfoSpan icon={<FaTicketAlt />}>
            Ticket Type: <span>{eventTicket?.name}</span>
          </InfoSpan>
          <InfoSpan icon={<FaQuestionCircle />}>
            <div className="flex gap-3">
              Status: <Badge status={event?.status} label={event?.status} />
            </div>
          </InfoSpan>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
