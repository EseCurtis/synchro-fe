import customStyles from "@/app/_components/customStyles/index.module.css";
import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import { useRouterO } from "@/v2/hooks/use-router";
import { useParams } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { BiBell } from "react-icons/bi";
import { Spinner } from "../../spinner/Spinner";
import NoNotifications from "./no_notifications";
import NotificationItem from "./notification_item";

const NotificationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState(true);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { push } = useRouterO();

  const params = useParams();
  const id = params.id;

  const SYSTEM_NOTIFICATION_TYPE = "system_announcement";

  const { data, isLoading } = usePaginatedQuery({
    url: `/admin/notifications/for-admin?type=${SYSTEM_NOTIFICATION_TYPE}`,
    queryKey: ["notifications", SYSTEM_NOTIFICATION_TYPE, "header"],
    enabled: true,
  });

  const notificationHistory =
    (data?.pages?.map((page: any) => page.data.data).flat() as any[]) ?? [];

  const latestNotifications = notificationHistory.slice(0, 4);

  const openModal = () => {
    setIsModalOpen(true);
   setView(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const closeModal_Effect = (event: any) => {
      if (
        modalRef.current &&
        event.target instanceof Node &&
        !modalRef.current.contains(event.target)
      ) {
        closeModal();
        setView(true);
      }
    };

    document.addEventListener("click", closeModal_Effect);

    return () => {
      document.removeEventListener("click", closeModal_Effect);
    };
  }, [modalRef]);

  return (
    <>
      <div
        ref={modalRef}
        onClick={openModal}
        className="relative bg-gray-100 w-[3em] h-[3em] flex items-center justify-center rounded-full"
      >
        <BiBell size={"24px"} />

        {isModalOpen && (
          <div
            className={`z-50 absolute bg-white w-[400px] h-[300px] overflow-y-scroll top-[100%] right-[-20px] rounded-[15px] drop-shadow-lg border`}
          >
            <div className="w-[100%] h-[100%] p-[15px] relative flex flex-col">
              <span className="absolute bg-white rounded rotate-45 w-5 h-5 top-[-10px] right-[35px] border-t border-l"></span>

              {isLoading ? (
                <Spinner />
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  {!view && latestNotifications.length > 0 ? (
                    <div
                      className={`${customStyles.customScrollbar} flex flex-col overflow-y-auto gap-4 w-[100%] h-[100%] custom-scroll`}
                    >
                      {latestNotifications.map((data, index) => (
                        <Fragment key={index}>
                          <NotificationItem {...data} />
                        </Fragment>
                      ))}
                    </div>
                  ) : (
                    <NoNotifications />
                  )}
                </div>
              )}
              {!view && notificationHistory.length > 4 && (
                <div className="pt-3  mt-3 flex justify-end">
                  <button
                    type="button"
                    className="text-xs font-semibold w-full bg-gray-400/10 p-3 text-primary-600 hover:underline"
                    onClick={(event) => {
                      event.stopPropagation();
                      setIsModalOpen(false);
                      push("/dashboard/faq_and_notifications");
                    }}
                  >
                    See more
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationModal;
