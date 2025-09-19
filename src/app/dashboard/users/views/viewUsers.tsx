import ModalTabButton from "@/app/_components/button/modalTabButton";
import {
    userBlockedIcon,
    userFollowersIcon,
    userFollowingIcon,
} from "@/app/_components/icons/preview/usersStatIcon";
import Input from "@/app/_components/input_fields";
import DefaultTable from "@/app/_components/table/defaultTable";
import NoData from "@/app/_components/table/NoData";
import TablePagination from "@/app/_components/table/tablePagination";
import { TABLE_STYLE } from "@/constant";
import { useSearchQuery } from "@/hooks/api/useSearchQuery";
import { TStringIndexObject } from "@/utils/types";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import UserStat from "../components/userStat";

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
    updateSearch: updateFollowersSearch,
  } = useSearchQuery({
    baseUrl: `/admin/users/${user?.id}/followers`,
    queryKey: ["follow", String(user?.id)],
    enabled: !!user?.id,
  });

  const {
    data: followingResponse,
    fetchNextPage: following_fetchNextPage,
    isFetchingNextPage: following_isFetchingNextPage,
    updateSearch: updateFollowingSearch,
  } = useSearchQuery({
    baseUrl: `/admin/users/${user?.id}/following`,
    queryKey: ["following", String(user?.id)],
    enabled: !!user?.id,
  });

  const {
    data: blockedResponse,
    fetchNextPage: blocked_fetchNextPage,
    isFetchingNextPage: blocked_isFetchingNextPage,
    updateSearch: updateBlockedSearch,
  } = useSearchQuery({
    baseUrl: `/admin/users/${user?.id}/blocked`,
    queryKey: ["blocked", String(user?.id)],
    enabled: !!user?.id,
  });

  const userData: TStringIndexObject = {
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

  // Search state management
  const [currentTab, setCurrentTab] = useState<string>("followers");

  // Search configuration for different user types - matches actual entity structure
  const searchConfig = {
    followers: {
      searchFields: ['follower.firstName', 'follower.lastName', 'follower.username', 'follower.businessName', 'user.email', 'user.phoneNumber'],
      updateSearch: updateFollowersSearch
    },
    following: {
      searchFields: ['followed.firstName', 'followed.lastName', 'followed.username', 'followed.businessName', 'user.email', 'user.phoneNumber'],
      updateSearch: updateFollowingSearch
    },
    blocked: {
      searchFields: ['blocked.firstName', 'blocked.lastName', 'blocked.username', 'blocked.businessName', 'user.email', 'user.phoneNumber'],
      updateSearch: updateBlockedSearch
    }
  };

  // Update current tab when displayed records change
  useEffect(() => {
    setCurrentTab(displayedRecords[0]);
  }, [displayedRecords]);

  // Search function for backend
  const handleSearch = (searchValue: string) => {
    const config = searchConfig[currentTab as keyof typeof searchConfig];
    if (config) {
      config.updateSearch({ search: searchValue });
    }
  };

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
                  setDisplayedRecords([_, userData[_]]);
                  setDisplayedRecordsActions([
                    userData[`${_}Actions`][0],
                    userData[`${_}Actions`][1],
                  ]);
                }}
              />
            </Fragment>
          ))}
        </div>

        {userData[currentTab]?.length > 0 ? (
          <>
            <div className="flex gap-3 items-center mb-4">
              <Input
                name="search"
                type="search"
                placeholder={`Search ${currentTab}...`}
                onChange={(e) => handleSearch(e.target.value)}
                style={{
                  width: "300px",
                  border: "1px solid #EEE",
                }}
              />
              <button
                onClick={() => handleSearch('')}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Clear
              </button>
            </div>
            {/* @ts-ignore */}
            <DefaultTable header={header}>
              {userData[currentTab]?.map(
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
                            <h3>
                              {_?.follower?.firstName ?? _?.follower?.username ?? _?.followed?.firstName ?? _?.followed?.username}
                            </h3>
                          </div>
                        </div>
                      </td>
                      <td className={TABLE_STYLE}>
                        <h3>{_?.follower?.username ?? _?.followed?.username}</h3>
                      </td>
                      <td className={TABLE_STYLE}>
                        <h3>{_?.follower?.gender ?? _?.followed?.gender ?? "N/A"}</h3>
                      </td>
                      <td className={TABLE_STYLE}>
                        <h3>{_?.follower?.phoneNumber ?? _?.followed?.phoneNumber ?? "N/A"}</h3>
                      </td>
                      <td className={TABLE_STYLE}>
                        <h3>{moment(_?.createdAt).format("MMM DD YYYY")}</h3>
                      </td>
                    </tr>
                  );
                }
              )}
            </DefaultTable>
            <TablePagination
              loading={displayedRecordsActions[1]}
              onFetchMore={displayedRecordsActions[0]}
            />
          </>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
};

export default ViewUsers;
