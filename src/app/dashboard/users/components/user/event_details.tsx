import ModalTabButton from "@/app/_components/button/modalTabButton";
import customStyles from "@/app/_components/customStyles/index.module.css";
import { Event } from "@/v2/types/event.types";
import Image from "next/image";
import { useState } from "react";
import Guests from "./event/guests";
import Info from "./event/info";
import Tickets from "./event/tickets";

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

const buttonClass =
  "px-[5px] py-2 rounded-full text-[12px] text-black border border-2 border-gray-300 ";
const buttonStyle = {
  background: "var(--primary-bg-gradient)",
  border: "none",
  color: "#fff",
};

const EventDetails = ({ event }: { event: Event }) => {
  const [tabContent, setTabContent] = useState<any>(<Info data={event} />);
  const [declineIsOpen, setDeclineIsOpen] = useState(false);

  
  const authorInfo = event?.creator;

  return (
    <div>
      {declineIsOpen ? (
        declineIsOpen
      ) : (
        <div className="p-3">
          <div className="font-bold text-center mb-7">Event details</div>
          <div
            className={`overflow-y-scroll max-h-[70vh] ${customStyles.customScrollbar}`}
          >
            <div className="bg-gray-300 rounded w-[100%] h-[100px] relative">
              <div className="w-full h-full absolute overflow-clip flex items-center justify-center rounded ">
                <Image
                  src={event.banner}
                  alt={event.name}
                  width={400}
                  height={100}
                  
                  className="bg-[linear-gradient(#00000040,#fff)] w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-500 rounded-full w-[70px] h-[70px] overflow-clip absolute right-[1em] bottom-[-30%] border-[2px] border-white">
                <Image
                  src={authorInfo?.avatar}
                  width={70}
                  height={70}
                  className="w-full h-full object-cover"
                  alt={authorInfo?.username}
                />
              </div>
              <p className="absolute font-bold left-[0] bottom-[-30px]">
                {event.name}
              </p>
            </div>

            <div className="flex flex-wrap mt-10 w-[100%] gap-3">
              <p className="flex items-center gap-3 w-[100%]">
                {hugIcon}{" "}
                <span className="text-sm text-gray-500">
                  Host:{" "}
                  <u>
                    @{authorInfo?.username}
                  </u>
                </span>
              </p>
              <div className="grid grid-cols-2 gap-3">
                <p className="flex items-center gap-3">
                  {hugIcon}{" "}
                  <span className="text-sm text-gray-500">
                    {event.category.name}
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  {hugIcon}{" "}
                  <span className="text-sm text-gray-500">{event.isPublic ? "Public event": "Private event"}</span>
                </p>
              </div>
            </div>

            {/* <div className="grid mt-7 gap-4">
              <div className="grid grid-cols-2 gap-auto">
                <p className="text-sm text-gray-400">Reasons for report</p>
                <p className="text-sm font-bold">
                  Lorem ipsum dolor sit amet consectetur.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-auto">
                <p className="text-sm text-gray-400">Reported by</p>
                <p className="text-sm font-bold">Jerry Koepp</p>
              </div>
              <div className="grid grid-cols-2 gap-auto">
                <p className="text-sm text-gray-400">Date reported</p>
                <p className="text-sm font-bold">11:32pm, May 3rd, 2021</p>
              </div>
            </div> */}

            <div className="grid grid-cols-3 gap-2 w-[90%] h-[3em] m-auto p-3 mt-5">
              <ModalTabButton
                isActive={tabContent.type === Info}
                onClick={() => setTabContent(<Info data={event} />)}
                label="Events Info"
              />

              <ModalTabButton
                isActive={tabContent.type === Guests}
                onClick={() => setTabContent(<Guests data={event} />)}
                label="Guest"
              />

              <ModalTabButton
                isActive={tabContent.type === Tickets}
                onClick={() => setTabContent(<Tickets data={event} />)}
                label="Tickets"
              />
            </div>

            {tabContent}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
