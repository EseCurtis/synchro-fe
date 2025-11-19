"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { UserAvatarV2 } from "@/v2/components/common/avatar.component";
import { UserData } from "@/v2/types/user.types";
import moment from "moment";
import React from "react";
import { SlCalender } from "react-icons/sl";
import NotificationModal from "./components/notification_modal";

interface DashboaradHeaderProps {
  title: string;
  quantity?: string;
}

const DashboaradHeader: React.FC<DashboaradHeaderProps> = ({
  title,
  quantity,
}) => {
  const { user } = useAuthContext();

  return (
    <div
      className="flex justify-between items-center py-[1em]"
      style={{
        borderBottom: "1px solid #EDEFF5",
      }}
    >
      <div className="flex items-left gap-5">
        <p className="font-bold">{title}</p>
      </div>

      <div className="flex items-center justify-between gap-[4em]">
        <div className="flex items-center gap-3">
          <SlCalender size={"24px"} />
          <p className="font-400">{moment().format("MMM DD, yyyy")}</p>
        </div>

        <NotificationModal />

        <div className="flex gap-2 items-center">
          <div className="h-[32px] w-[32px] flex items-center justify-center">
            <UserAvatarV2 user={user as any as UserData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboaradHeader;
