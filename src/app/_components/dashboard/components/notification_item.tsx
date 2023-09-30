import NotificationIcon from "./notification_icon";

const NotificationItem = () => {
  return (
    <div className="block w-[100%] p-4 pt-1 flex items-center gap-4 border-b">
      <NotificationIcon
        style={{
          width: 32,
          height: 32,
        }}
      />

      <b className="text-sm">Notification title goes here... <u>Click to view</u></b>
    </div>
  );
};

export default NotificationItem;
