"use client";

import { AppToast } from "@/app/_components/AppToast";
import {
    deleteIcon,
    editIcon,
    noActionIcon,
} from "@/app/_components/icons/preview/previewActions";
import { Spinner } from "@/app/_components/spinner/Spinner";
import TabComponent from "@/app/_components/tab";
import DashboardLayout from "@/app/layouts/dashboardLayout";
import { useTMutation } from "@/hooks/api/useTMutation";
import { useTQuery } from "@/hooks/api/useTQuery";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import MembersView from "../views/member";
import PersonalDetails from "../views/personalDetails";
import ViewUsersWallet from "../views/usersWallet";
import ViewUsers from "../views/viewUsers";
import ViewUserService from "../views/viewUserService";
import ViewUserEvent from "../views/viewUsersEvent";
import ViewUserVenues from "../views/viewUserVenues";

const PreviewBox = () => {
  const params = useParams();
  const id = params.id;

  const { data: userDetails } = useTQuery({
    url: `/admin/users/${id}`,
    queryKey: ["users", String(id)],
  });

  // @ts-ignore
  const user = userDetails?.data;

  const data = [
    {
      header: "Personal Details",
      component: <PersonalDetails user={user} />,
    },
    user?.isBusiness && {
      header: "Business Details ",
      component: <MembersView user={user} />,
    },
    {
      header: "Users",
      component: <ViewUsers user={user} />,
    },
    {
      header: "Wallet ",
      component: <ViewUsersWallet />,
    },
    {
      header: "Events ",
      component: <ViewUserEvent />,
    },
    {
      header: "Venues ",
      component: <ViewUserVenues />,
    },
    {
      header: "Services ",
      component: <ViewUserService />,
    },
  ];

  const { mutate, isLoading } = useTMutation({
    url: `/admin/users/suspend`,
    method: "post",
    options: {
      onSuccess() {
        toast(<AppToast>User suspended successfully</AppToast>);
      },
    },
  });

  const { mutate: unsuspend, isLoading: unsuspending } = useTMutation({
    url: `/admin/users/unsuspend`,
    method: "post",
    options: {
      onSuccess() {
        toast(<AppToast>User account activated successfully</AppToast>);
      },
    },
  });

  return (
    <DashboardLayout title="User details">
      <div className="flex justify-between items-center">
        <div className="my-5 flex gap-5 items-center ">
          {user?.profileImage ? (
            <img
              className="w-[80px] h-[80px] rounded-full object-cover"
              src={user?.profileImage}
              alt=""
            />
          ) : (
            <div className="w-[80px] h-[80px] rounded-full bg-gray-500" />
          )}
          <div>
            <h3>{user?.name ?? user?.username}</h3>
            <span className="text-second_text">{user?.email}</span>
          </div>
        </div>

        <div className="flex ">
          <div>{editIcon}</div>
          <button
            onClick={() => {
              if (user.suspended) {
                mutate({
                  userId: user.id,
                });
                
              } else {
                unsuspend({
                  userId: user.id,
                });
              }
            }}
          >
            {isLoading || unsuspending ? <Spinner /> : noActionIcon}
          </button>
          <div>{deleteIcon}</div>
        </div>
      </div>

      <div className="my-10">
        <TabComponent data={data} />
      </div>
    </DashboardLayout>
  );
};

export default PreviewBox;
