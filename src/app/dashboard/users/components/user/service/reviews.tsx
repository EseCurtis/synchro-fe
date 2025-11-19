import FilterComponent from "@/app/_components/forms/filterComponent";
import Input from "@/app/_components/input_fields";
import { Spinner } from "@/app/_components/spinner/Spinner";
import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import { ReviewV2 } from "@/utils/types";
import { UserAvatarV2 } from "@/v2/components/common/avatar.component";
import { BusinessProfile } from "@/v2/types/service.types";
import moment from "moment";
import { useState } from "react";
import { BiSolidStar } from "react-icons/bi";

const Item = ({ reviewerProfile, rating, createdAt, comment }: ReviewV2) => {
  const userWithProfile = {
    ...reviewerProfile.user,
    profiles: [
      {
        ...reviewerProfile,
        user: undefined,
      },
    ],
  };
  return (
    <div className="flex gap-3 mt-4 pb-3 border-b border-gray-200">
      <div className="w-[15%] flex">
        <div className="w-[48px] h-[48px] bg-gray-400 rounded-full overflow-hidden">
          <UserAvatarV2 user={userWithProfile} />
          {/* <Image src={reviewerProfile.avatar} width={50} height={50} className="w-full h-full object-cover" alt={reviewerProfile.username}/> */}
        </div>
      </div>
      <div className="w-[85%] grid gap-2">
        <div className="flex justify-between items-center">
          <p className="font-bold text-sm">{reviewerProfile.username}</p>

          <div className="flex items-center gap-2">
            <div className="text-sm flex gap-1 items-center">
              <i className="text-yellow-400">
                <BiSolidStar />
              </i>
              <b>{rating}</b>
            </div>

            <span className="text-xs text-gray-400">
              {moment(createdAt).fromNow()}
            </span>
          </div>
        </div>
        <div>
          <p className="text-sm pt-3">{comment}</p>
        </div>
      </div>
    </div>
  );
};

const Reviews = ({ data: service }: { data: BusinessProfile }) => {
  const [search, setSearch] = useState("");
  const { data, isLoading, isFetchingNextPage, fetchNextPage, isFetching } =
    usePaginatedQuery({
      url: `/reviews/business/${service.id}?search=${search}`,
      queryKey: ["review", "service", String(service.id), search],
      enabled: true,
      useSecondTotal: true,
    });

  const reviews: ReviewV2[] =
    (data?.pages?.map((e: any) => e.data.data).flat() as any[]) || [];

  const total = ((data?.pages?.[0] as any)?.data as any)?.total || 0;

  const hasNextPage = total > reviews?.length;

  return (
    <div>
      <h1 className="flex text-left gap-2 mb-3 items-center">
        Reviews{" "}
        {isLoading ? (
          <Spinner />
        ) : (
          <span className="bg-green-200/20 text-green-400 p-1 py-0.5 rounded text-sm">
            {total}
          </span>
        )}
      </h1>

      {reviews.length > 0 ? (
        <>
          <div className="flex items-center">
            <Input
              name="search"
              type="search"
              placeholder="Search for anything..."
              style={{
                width: "100%",
                border: "1px solid #EEE",
              }}
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
            {isFetching && <Spinner />}
            <FilterComponent />
          </div>

          <div className="grid gap-4 px-3">
            {reviews.map((_: any, index: any) => (
              <Item key={index} {..._} />
            ))}

            {hasNextPage && (
              <div className="text-center mt-7">
                <h3
                  onClick={() => {
                    fetchNextPage();
                  }}
                  className="w-[auto] flex justify-center font-bold p-3 px-2 cursor-pointer rounded border border-gray-300"
                >
                  {isFetchingNextPage ? <Spinner /> : "Load more"}
                </h3>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-center flex items-center justify-center p-3">
          <span className="font-semibold text-gray-500/40">No Reviews Yet</span>
        </div>
      )}
    </div>
  );
};

export default Reviews;
