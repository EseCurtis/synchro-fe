import ModalTabButton from "@/app/_components/button/modalTabButton";
import {
  userBlockedIcon,
  userFollowersIcon,
  userFollowingIcon,
} from "@/app/_components/icons/preview/usersStatIcon";
import Input from "@/app/_components/input_fields";
import { Spinner } from "@/app/_components/spinner/Spinner";
import DefaultTable from "@/app/_components/table/defaultTable";
import NoData from "@/app/_components/table/NoData";
import TablePagination from "@/app/_components/table/tablePagination";
import { TABLE_STYLE } from "@/constant";
import { useSearchQuery } from "@/hooks/api/useSearchQuery";
import { useTQuery } from "@/hooks/api/useTQuery";
import { TStringIndexObject } from "@/utils/types";
import { UserAvatarV2 } from "@/v2/components/common/avatar.component";
import { useRouterO } from "@/v2/hooks/use-router";
import { UserData, UserStatsResponse } from "@/v2/types/user.types";
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

const ViewUsers = ({ user }: { user: UserData }) => {
  const { push } = useRouterO();

  const { data: relationshipStatsData, isLoading: statsLoading } = useTQuery<UserStatsResponse>({
    url: `/admin/users/${user?.id}/relationship-stats`,
    queryKey: ["user", String(user?.id), "relationship-stats"],
    enabled: !!user?.id,
  });

  const relationshipStats = relationshipStatsData!?.data.stats;

  const {
    data: followersResponse,
    fetchNextPage: followers_fetchNextPage,
    isFetchingNextPage: followers_isFetchingNextPage,
    updateSearch: updateFollowersSearch,
    isLoading: followersLoading,
    isFetching: followersFetching,
    searchParams: { search: followersSearchValue },
    hasNextPage: followersHasNextPage,
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
    isLoading: followingLoading,
    isFetching: followingFetching,
    searchParams: { search: followingSearchValue },
    hasNextPage: followingHasNextPage,
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
    isLoading: blockedLoading,
    isFetching: blockedFetching,
    searchParams: { search: blockedSearchValue },
    hasNextPage: blockedHasNextPage,
  } = useSearchQuery({
    baseUrl: `/admin/users/${user?.id}/blocked`,
    queryKey: ["blocked", String(user?.id)],
    enabled: !!user?.id,
  });

  const userMeta = {
    followersCount: Number(
      (followersResponse as any)?.pages?.[0]?.data?.total || 0
    ),
    followingCount: Number(
      (followingResponse as any)?.pages?.[0]?.data?.total || 0
    ),
    blockedCount: Number(
      (blockedResponse as any)?.pages?.[0]?.data?.total || 0
    ),
  };

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
      searchFields: [
        "follower.firstName",
        "follower.lastName",
        "follower.username",
        "follower?.businessName",
        "user.email",
        "user.phoneNumber",
      ],
      updateSearch: updateFollowersSearch,
    },
    following: {
      searchFields: [
        "followed.firstName",
        "followed.lastName",
        "followed.username",
        "followed?.businessName",
        "user.email",
        "user.phoneNumber",
      ],
      updateSearch: updateFollowingSearch,
    },
    blocked: {
      searchFields: [
        "blocked.firstName",
        "blocked.lastName",
        "blocked.username",
        "blocked?.businessName",
        "user.email",
        "user.phoneNumber",
      ],
      updateSearch: updateBlockedSearch,
    },
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
      amount: relationshipStats?.followers ?? 0,
      searchResult: userMeta.followersCount,
      loading: followersLoading,
      fetching: followersFetching,
      searchValue: followersSearchValue,
      canNext: followersHasNextPage,
      id: "followers",
    },
    {
      title: "Total Following",
      icon: userFollowingIcon,
      amount: relationshipStats?.following ?? 0,
      searchResult: userMeta.followingCount,
      loading: followingLoading,
      fetching: followingFetching,
      searchValue: followingSearchValue,
      canNext: followingHasNextPage,
      id: "following",
    },
    {
      title: "Total Blocked",
      icon: userBlockedIcon,
      amount: relationshipStats?.blocked,
      searchResult: userMeta.blockedCount,
      loading: blockedLoading,
      fetching: blockedFetching,
      searchValue: blockedSearchValue,
      canNext: blockedHasNextPage,
      id: "blocked",
    },
  ];

  const currentTabMeta =
    userViewData.find((item) => item.id == currentTab) || userViewData[0];
  const listLoading = currentTabMeta?.fetching;
  const searchValue = currentTabMeta?.searchValue;
  const searchResult = currentTabMeta?.searchResult;

  return (
    <div>
      <div className="flex gap-5 my-[4em]">
        {userViewData.map((_, index) => (
          <Fragment key={index}>
            <UserStat
              icon={_.icon}
              title={_.title}
              amount={_.amount}
              loading={statsLoading}
            />
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

                  // handleSearch("")
                }}
              />
            </Fragment>
          ))}
        </div>

        <div className="flex gap-3 items-center justify-end mb-4">
          {
            <div className="mr-auto flex items-end mt-2">
              {searchValue ? (
                listLoading ? (
                  <div className="flex items-center gap-2">
                    <Spinner /> <p>Searching...</p>
                  </div>
                ) : searchResult ? (
                  <p>{searchResult} results found</p>
                ) : (
                  <p>No Result found</p>
                )
              ) : (
                <p className="text-lg font-bold">
                  {user?.profiles?.[0]?.firstName}'s {currentTab} list
                </p>
              )}
            </div>
          }
          <div className="flex items-center pr-5">
            <Input
              name="search"
              type="search"
              placeholder={`Search ${currentTab}...`}
              onChange={(e) => handleSearch(e.target.value)}
              value={searchValue}
              style={{
                width: "300px",
                border: "1px solid #EEE",
              }}
              key={currentTab}
            />
          </div>
        </div>
        {userData[currentTab]?.length > 0 ? (
          <>
            {/* @ts-ignore */}
            <DefaultTable header={header}>
              {userData[currentTab]?.map((_: any, key: number) => {
                const entity = _.follower || _.followed || _.blocked;
                const user = {
                  ...entity.user,
                  profiles: [
                    {
                      ...entity,
                      user: undefined,
                    },
                  ],
                } as UserData;

                const profile = user?.profiles?.[0];

                return (
                  <tr
                    key={key}
                    onClick={() => {
                      push(`/dashboard/users/${user?.id}`);
                    }}
                    className="hover:bg-slate-50 cursor-pointer"
                  >
                    <td className={TABLE_STYLE}>
                      <div className="flex gap-5 items-center">
                        <div className="w-[3em] h-[3em] flex items-center justify-center">
                          <UserAvatarV2 user={user} />
                        </div>
                        <div>
                          <h3>
                            {profile?.firstName || profile?.lastName
                              ? `${profile?.firstName} ${profile?.lastName}`
                              : profile?.username}
                          </h3>
                        </div>
                      </div>
                    </td>
                    <td className={TABLE_STYLE}>
                      <h3 className="text-sm hover:underline text-slate-500 cursor-pointer">
                        @{profile.username}
                      </h3>
                    </td>
                    <td className={TABLE_STYLE}>
                      <h3>{user?.gender ?? "not specified"}</h3>
                    </td>
                    <td className={TABLE_STYLE}>
                      <h3 className="text-sm">{user.phoneNumber ?? "---"}</h3>
                    </td>
                    <td className={TABLE_STYLE}>
                      <h3 className="text-sm">
                        {moment(user.updatedAt).format("MMM DD YYYY")}
                      </h3>
                    </td>
                  </tr>
                );
              })}
            </DefaultTable>
            {currentTabMeta.canNext && (
              <TablePagination
                loading={displayedRecordsActions[1] || currentTabMeta.fetching}
                onFetchMore={displayedRecordsActions[0]}
              />
            )}
          </>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
};

export default ViewUsers;
