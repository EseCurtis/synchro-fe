import React, { Fragment } from "react";
import UserStat from "../components/userStat";
import DefaultTable from "@/app/_components/table/defaultTable";
import { TABLE_STYLE } from "@/constant";
import { table } from "@/utils/contents/dummy/table";
import Image from "next/image";
import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import {
  userBlockedIcon,
  userFollowersIcon,
  userFollowingIcon,
} from "@/app/_components/icons/preview/usersStatIcon";
import { useTQuery } from "@/hooks/api/useTQuery";
import moment from "moment";

const header = [
  "Full Name",
  "Username",
  "Gender",
  "Phone Number",
  "Last Active",
];

const ViewUsers = ({ user }: { user: any }) => {
  const userViewData = [
    {
      title: "Total Followers",
      icon: userFollowersIcon,
      amount: user?.followerCount ?? 0,
    },
    {
      title: "Total Following",
      icon: userFollowingIcon,
      amount: user?.followingCount ?? 0,
    },
    {
      title: "Total Blocked",
      icon: userBlockedIcon,
      amount: user?.blockedUsers?.length,
    },
  ];

  const { data } = useTQuery({
    url: `/follow/followers?userId=${user?.id}&page=1&limit=10`,
    queryKey: ["follow", String(user?.id)],
    enabled: !!user?.id,
  });

  // @ts-ignore
  const followers = data?.data?.data;

  return (
    <div>
      <div className="flex gap-5 my-[4em]">
        {userViewData.map((_, index) => (
          <Fragment key={index}>
            <UserStat icon={_.icon} title={_.title} amount={_.amount} />
          </Fragment>
        ))}
      </div>

      <div className="my-[3em]">
        <DashboardAction />
        {/* @ts-ignore */}
        <DefaultTable header={header}>
          {followers?.map((_: any, key: number) => {
            return (
              <tr key={key}>
                <td className={TABLE_STYLE}>
                  <div className="flex gap-5 items-center">
                    {_?.profileImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={_?.profileImage}
                        className="w-[3em] h-[3em] bg-gray-500 rounded-full"
                        alt=""
                      />
                    ) : (
                      <div className="w-[3em] h-[3em] bg-gray-500 rounded-full"></div>
                    )}
                    <div>
                      <h3>{_?.follower?.name ?? _?.follower?.username}</h3>
                    </div>
                  </div>
                </td>
                <td className={TABLE_STYLE}>
                  <h3>{_?.follower?.username}</h3>
                </td>
                <td className={TABLE_STYLE}>
                  <h3>{_?.follower?.gender ?? "N/A"}</h3>
                </td>
                <td className={TABLE_STYLE}>
                  <h3>{_?.followe?.number ?? "N/A"}</h3>
                </td>
                <td className={TABLE_STYLE}>
                  <h3>{moment(_?.createdAt).format("MMM DD YYYY")}</h3>
                </td>
              </tr>
            );
          })}
        </DefaultTable>
      </div>
    </div>
  );
};

export default ViewUsers;
