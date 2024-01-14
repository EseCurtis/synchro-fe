import React, { Fragment, useEffect, useState } from "react";
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
import ModalTabButton from "@/app/_components/button/modalTabButton";
import TablePagination from "@/app/_components/table/tablePagination";
import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";

const header = [
  "Full Name",
  "Username",
  "Gender",
  "Phone Number",
  "Last Active",
];

const ViewUsers = ({ user }: { user: any }) => {
  const {
    data: followersResponse,
    fetchNextPage: followers_fetchNextPage,
    isFetchingNextPage: followers_isFetchingNextPage,
  } = usePaginatedQuery({
    url: `/follow/followers?userId=${user?.id}`,
    queryKey: ["follow", String(user?.id)],
    enabled: !!user?.id,
  });

  const {
    data: followingResponse,
    fetchNextPage: following_fetchNextPage,
    isFetchingNextPage: following_isFetchingNextPage,
  } = usePaginatedQuery({
    url: `/follow/followings?userId=${user?.id}`,
    queryKey: ["following", String(user?.id)],
    enabled: !!user?.id,
  });

  const {
    data: blockedResponse,
    fetchNextPage: blocked_fetchNextPage,
    isFetchingNextPage: blocked_isFetchingNextPage,
  } = usePaginatedQuery({
    url: `/user/blocked?userId=${user?.id}`,
    queryKey: ["blocked", String(user?.id)],
    enabled: !!user?.id,
  });

  const userData = {
    // @ts-ignore
    followers: followersResponse?.pages
      ?.map((e: any) => e.data.data)
      .flat() as any[],
    followersActions: [followers_fetchNextPage, followers_isFetchingNextPage],
    // @ts-ignore
    following: followingResponse?.pages
      ?.map((e: any) => e.data.data)
      .flat() as any[],
    followingActions: [following_fetchNextPage, following_isFetchingNextPage],
    // @ts-ignore
    blocked: blockedResponse?.pages
      ?.map((e: any) => e.data.data)
      .flat() as any[],
    blockedActions: [blocked_fetchNextPage, blocked_isFetchingNextPage],
  };

  const [displayedRecords, setDisplayedRecords] = useState<any>([
    "followers",
    null,
  ]);
  const [displayedRecordsActions, setDisplayedRecordsActions] = useState<any>([
    followers_fetchNextPage,
    followers_isFetchingNextPage,
  ]);

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
        <div className="flex gap-3">
          {["followers", "following", "blocked"].map((_: any, i) => (
            <Fragment key={i}>
              <ModalTabButton
                label={_}
                isActive={displayedRecords[0] == _}
                customClass="px-[20px!important]"
                onClick={() => {
                  //@ts-ignore
                  setDisplayedRecords([_, userData[_]]);
                  //@ts-ignore
                  setDisplayedRecordsActions([ userData[`${_}Actions`][0], userData[`${_}Actions`][1] ]);
                }}
              />
            </Fragment>
          ))}
        </div>
        <DashboardAction />
        {/* @ts-ignore */}
        <DefaultTable header={header}>
          {(displayedRecords[1] || userData["followers"])?.map(
            (_: any, key: number) => {
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
            }
          )}
        </DefaultTable>

        {displayedRecords[1]?.length > 0 ? (
          <TablePagination
            loading={displayedRecordsActions[1]}
            onFetchMore={displayedRecordsActions[0]}
          />
        ) : (
          <p className="pt-4 text-center">No data to display</p>
        )}
      </div>
    </div>
  );
};

export default ViewUsers;
