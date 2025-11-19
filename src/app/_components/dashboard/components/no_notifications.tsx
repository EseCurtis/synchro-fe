import NotificationIcon from "./notification_icon";

const NoNotifications = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <NotificationIcon
        style={{
          width: 73,
          height: 72,
        }}
      />

      <div className="mt-5 w-[70%] text-center">
        <p>You currently don&quot;t have any notifications</p>
      </div>
    </div>
  );
};

export default NoNotifications;
