import GoodIcon from "@/app/_components/icons/tickets/good";
import QuestionIcon from "@/app/_components/icons/tickets/question";
import Input from "@/app/_components/input_fields";
import { Spinner } from "@/app/_components/spinner/Spinner";
import TablePagination from "@/app/_components/table/tablePagination";
import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import { Event } from "@/v2/types/event.types";
import { UserTicket, UserTicketStatus } from "@/v2/types/ticket.types";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

const Item = ({ data }: { data: UserTicket }) => {
  //console.log("Dayta", data);

  const userInfo = data.profile;
  const hasTicket = data.status == UserTicketStatus.ACTIVE;
  const ticketPrice = data?.ticket?.price || 0;
  const boughtAtPrice = data?.paidAmount || 0;
  const quantityBought = ticketPrice
    ? Math.floor(boughtAtPrice / ticketPrice)
    : 0;

  return userInfo ? (
    <div className="flex gap-3 w-[100%]">
      <div className="w-[55px] h-[55px] bg-gray-300 rounded-full overflow-clip">
        <Image
          src={userInfo?.avatar}
          width={55}
          height={55}
          className="w-full h-full object-cover"
          alt={userInfo?.firstName}
        />
      </div>
      <div className="flex flex-col justify-center">
        <h4 className="flex items-center gap-1">
          {userInfo.firstName} {userInfo?.lastName}{" "}
          {hasTicket ? <GoodIcon /> : <QuestionIcon />}
        </h4>
        <p className="text-gray-400 text-[13px]">
          {" "}
          {userInfo?.lastName} • {quantityBought} Tickets{" "}
        </p>
      </div>
      <div className="h-[100%] ml-auto mr-[0] flex items-center">
        <FaArrowRight />
      </div>
    </div>
  ) : (
    <div className="border  p-3">
      <i className="opacity-70 text-sm">
        User with this ticket has been deleted.
      </i>
    </div>
  );
};

const Tickets = ({ data }: { data: Event }) => {
  const {
    data: responseData,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = usePaginatedQuery({
    url: `/admin/events/${data?.id}/userTickets`,
    queryKey: ["events", "tickets", data?.id, "all_"],
    enabled: true,
  });

  const tickets = (
    responseData?.pages?.map((e: any) => e.data.data).flat() || []
  )?.filter((ticket) => {
    return ticket.eventId == data.id;
  }) as UserTicket[];

  console.log("Tickets", responseData);

  return (
    <div>
      <h1 className="flex text-left gap-2 mb-3 mt-7">
        Tickets{" "}
        <span className="bg-green-200/50 text-green-400 p-1 py-1 rounded text-sm">
          {tickets.length}
        </span>
        {isFetching || (isLoading && <Spinner />)}
      </h1>

      {tickets.length > 0 ? (
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
            {tickets.map((_, index: any) => (
              <Item key={index} data={_} />
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
          <span className="font-semibold text-gray-500/40">No Tickets Yet</span>
        </div>
      )}
    </div>
  );
};

export default Tickets;
