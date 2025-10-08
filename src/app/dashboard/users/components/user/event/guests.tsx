import Input from "@/app/_components/input_fields";
import { Spinner } from "@/app/_components/spinner/Spinner";
import TablePagination from "@/app/_components/table/tablePagination";
import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import { Creator, Event, EventGuest } from "@/v2/types/event.types";
import { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";

const Item = ({ userData }: { userData: Creator }) => {
  const userInfo = userData;

  return (
    <div className="flex gap-3 w-[100%]">
      <div className="w-[55px] h-[55px] bg-gray-300 rounded-full overflow-clip">
        <img
          src={String(userInfo?.avatar)}
          width={55}
          height={55}
          className="w-full h-full object-cover"
          alt={String(userInfo?.firstName)}
        />
      </div>
      <div className="flex flex-col justify-center">
        <h4>
          {userInfo.firstName} {userInfo?.lastName}
        </h4>
        <p className="text-gray-400"> {userInfo?.lastName} </p>
      </div>
      <div className="h-[100%] ml-auto mr-[0] flex items-center">
        <FaArrowRight />
      </div>
    </div>
  );
};

const Guests = ({ data }: { data: Event }) => {
  const {
    data: responseData,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isLoading,
    isFetchingNextPage,
  } = usePaginatedQuery({
    url: `/admin/events/${data.id}/guests`,
    queryKey: ["events", "guests", data.id],
    enabled: true,
  });

  const guests = (responseData?.pages?.map((e: any) => e.data.data).flat() ||
    []) as EventGuest[];

  useEffect(() => {
    console.log("Guests", guests);
  }, [guests]);

  return (
    <div>
      <h1 className="flex text-left gap-2 mb-3 mt-7">
        Guests{" "}
        <span className="bg-green-200/50 text-green-400 p-1 py-1 rounded text-sm">
          {guests.length}
        </span>
        {isFetching || (isLoading && <Spinner />)}
      </h1>

      {guests.length > 0 ? (
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
            />
          </div>

          <div className="grid gap-4 px-3">
            {guests.map((_, index: any) => (
              <Item key={index} userData={_.profile} />
            ))}

            {hasNextPage ? (
              <TablePagination
                loading={isFetchingNextPage}
                onFetchMore={() => {
                  fetchNextPage();
                }}
              />
            ) : (
              <div className="text-center mt-7">
                <h3 className="w-[auto] font-bold p-3 px-2 cursor-pointer rounded border border-gray-300">
                  All Caught Up
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

export default Guests;
