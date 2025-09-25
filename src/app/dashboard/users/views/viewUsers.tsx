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
import { TStringIndexObject } from "@/utils/types";
import { UserAvatarV2 } from "@/v2/components/common/avatar.component";
import { useRouterO } from "@/v2/hooks/use-router";
import { UserData } from "@/v2/types/user.types";
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
  const { push } = useRouterO();
  const {
    data: followersResponse,
    fetchNextPage: followers_fetchNextPage,
    isFetchingNextPage: followers_isFetchingNextPage,
    updateSearch: updateFollowersSearch,
    isLoading: followersLoading,
    isFetching: followersFetching,
    searchParams: { search: followersSearchValue },
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
        "follower.businessName",
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
        "followed.businessName",
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
        "blocked.businessName",
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
      amount: userMeta.followersCount ?? 0,
      loading: followersLoading,
      fetching: followersFetching,
      searchValue: followersSearchValue,
      id: "followers",
    },
    {
      title: "Total Following",
      icon: userFollowingIcon,
      amount: userMeta?.followingCount ?? 0,
      loading: followingLoading,
      fetching: followingFetching,
      searchValue: followingSearchValue,
      id: "following",
    },
    {
      title: "Total Blocked",
      icon: userBlockedIcon,
      amount: userMeta?.blockedCount,
      loading: blockedLoading,
      fetching: blockedFetching,
      searchValue: blockedSearchValue,
      id: "blocked",
    },
  ];

  const currentTabMeta =
    userViewData.find((item) => item.id == currentTab) || userViewData[0];
  const listLoading = currentTabMeta?.fetching;
  const searchValue = currentTabMeta?.searchValue;

  return (
    <div>
      <div className="flex gap-5 my-[4em]">
        {userViewData.map((_, index) => (
          <Fragment key={index}>
            <UserStat
              icon={_.icon}
              title={_.title}
              amount={_.amount}
              loading={_.loading}
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
                }}
              />
            </Fragment>
          ))}
        </div>

        <div className="flex gap-3 items-center mb-4">
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
          />
          <button
            onClick={() => handleSearch("")}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Clear
          </button>

          {listLoading && <Spinner />}
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
