import { useTQuery } from "@/hooks/api/useTQuery";
import { Creator, Event } from "@/v2/types/event.types";
import moment from "moment";
import Image from "next/image";
import { BiInfoCircle, BiUser } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import {
  PiCalendar,
  PiCalendarCheckLight,
  PiMapPin,
  PiMarkerCircle,
  PiPerson,
  PiTicket,
} from "react-icons/pi";

const CollaboratorItem = ({
  userId,
  userData,
}: {
  userId?: string;
  userData?: Creator;
}) => {
  const { data: userDetails }: { data: any } = useTQuery({
    url: `/admin/users/${userId}`,
    queryKey: ["users", String(userId)],
    enabled: !userData && !!userId,
  });

  const userInfo = userData || userDetails?.data;

  return (
    userInfo && (
      <div className="flex gap-3 w-[100%]">
        <div className="w-[55px] h-[55px] bg-gray-300 rounded-full overflow-clip">
          <Image
            src={userInfo?.profileImage}
            width={55}
            height={55}
            alt={userInfo?.firstName}
          />
        </div>
        <div className="flex flex-col justify-center">
          <h4>
            {userInfo.firstName} {userInfo?.lastName}
          </h4>
          <p className="text-gray-400"> {userInfo?.lastName} </p>
        </div>
        <div className="h-[100%] ml-auto mr-[0] flex items-center">
          <FaArrowRight />
        </div>
      </div>
    )
  );
};

const Info = ({ data }: { data: Event }) => {
  data.maxAttendees = data.maxAttendees || 0;
  return (
    <div>
      <div className="grid mt-9 gap-4">
        <div className="flex items-center gap-2">
          <span className="bg-gray-100 rounded-full p-2">
            <PiCalendar />
          </span>
          <p className="text-sm">
            {moment(data.startDateTime).format("h:mm A")} -{" "}
            {moment(data.endDateTime).format("h:mm A MMMM YYYY")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-gray-100 rounded-full p-2">
            <PiMapPin />
          </span>
          <p className="text-sm">{data.address}</p>
        </div>
        <div className="flex gap-2">
          <span className="bg-gray-100 rounded-full p-2">
            <PiPerson />
          </span>
          <div className="flex items-center gap-2">
            <div className="flex text-sm gap-1">
              <div className=" flex bg-green-200 p-1 rounded-full w-5 h-5 gap-2">
                <i className=" flex items-center bg-green-400 p-1 w-[100%] h-[100%] rounded-full text-white">
                  <PiMarkerCircle />
                </i>
              </div>
              <span className="flex items-center whitespace-nowrap">
                {" "}
                {data.attendeesCount} going
              </span>
            </div>

            <div className="flex text-sm gap-1">
              <div className=" flex bg-red-200 p-1 rounded-full w-5 h-5">
                <i className=" flex items-center bg-yellow-400 p-1 w-[100%] h-[100%] rounded-full text-white">
                  <PiMarkerCircle />
                </i>
              </div>
              <span className="flex items-center whitespace-nowrap">
                {" "}
                {data.maxAttendees} maybe
              </span>
            </div>

            <div className="flex text-sm gap-1">
              <div className=" flex bg-red-200 p-1 rounded-full w-5 h-5">
                <i className=" flex items-center bg-red-400 p-1 w-[100%] h-[100%] rounded-full text-white">
                  <PiCalendarCheckLight />
                </i>
              </div>
              <span className="flex items-center whitespace-nowrap text-[12px]">
                {" "}
                {Math.abs((data.maxAttendees || 0) - data.attendeesCount)} not going
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-gray-100 rounded-full p-2">
            <PiTicket />
          </span>
          <p className="text-sm ">
            Ticket type: <span className="uppercase">{data.ticketType}</span>{" "}
            {data.ticketType == "paid" &&
              `, ${data.ticketPrice} ${data.currency}`}
          </p>
        </div>
      </div>

      <div className="grid gap-3 mt-6">
        <h4 className="flex items-center gap-2">
          <BiInfoCircle /> About
        </h4>
        <p>{data.description}</p>
      </div>

      {/* <div className="grid gap-3 mt-6">
        <h4 className="flex items-center gap-2">Hashtags</h4>
        <div className="flex gap-3">
          <p>#party</p>
          <p>#dance</p>
          <p>#2023</p>
        </div>
      </div> */}

      <div className="grid gap-3 mt-6">
        <h4 className="flex items-center gap-2">
          <BiUser /> Collaborators
        </h4>
        <div className="flex flex-col gap-7 mt-5">
          {data?.collaborators?.length === 0 && (
            <p className="text-sm">No collaborators added.</p>
          )}
          {(data?.collaborators || []).map((_, index: any) => (
            <CollaboratorItem key={index} userId={_.id} userData={_} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Info;
