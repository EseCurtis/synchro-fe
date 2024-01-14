import { useEffect, useState } from "react";
import NotificationIcon from "./notification_icon";

interface INotificationItem {
  title: string;
  message: string;
}

const NotificationItem: React.FC<INotificationItem> = ({
  title,
  message
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div
      className={`flex w-[100%] p-4 pt-1 items-center gap-4 border-b ${
        !expanded ? "relative" : ""
      }`}
    >
      <NotificationIcon
        style={{
          width: 32,
          height: 32,
        }}
      />

      <div className="flex flex-col">
        <b className="text-sm">{title}</b>
        <p className="text-xs">{message}</p>
      </div>

      <div
        className={`animate transition-[4s]  rounded-md ${
          expanded ? "flex flex-col item w-full h-full p-3 bg-white  " : ""
        } absolute top-0 right-0 z-50`}
      >
        
        <u
          className={`cursor-pointer text-xs top-0 right-5 bg-gray-500/10 p-1 px-2 rounded-full ${
            !expanded ? "hidden " : " ml-auto"
          }`}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Close" : "Click to view"}
        </u>
        <div className={`${!expanded ? "hidden" : ""} py-3 `}>
          <b className="text-sm">{title}</b>
          <p className="text-xs">{message}</p>
        </div>
      </div>

      <u
          className={`cursor-pointer text-[10px] top-0 right-5 bg-gray-500/10 p-1 px-2 rounded-full absolute`}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Close" : "Click to view"}
        </u>
    </div>
  );
};

export default NotificationItem;
