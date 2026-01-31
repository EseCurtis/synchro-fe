"use client";

import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import Dropdown from "@/app/_components/popups/dropDown";
import Modal from "@/app/_components/popups/modal";
import { Spinner } from "@/app/_components/spinner/Spinner";
import DefaultTable from "@/app/_components/table/defaultTable";
import NoData from "@/app/_components/table/NoData";
import TablePagination from "@/app/_components/table/tablePagination";
import { usePendingEvents, useUpdateEventStatus } from "@/hooks/api/v2/events";
import { EventStatus } from "@/v2/enums/event.enums";
import moment from "moment";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import Image from "../../../../../node_modules/next/image";
import LinkWithProgress from "../../../_components/ui/LinkWithProgress";
import EventDetails from "../../users/components/user/event_details";

const header = ["", "Business Name ", "User", "Category", "Date", "Actions", ""];
const style = "px-6 py-4 whitespace-no-wrap border-b border-gray-300";
const PendingEvents = () => {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const {
    data,
    refetch,
    hasNextPage,
    fetchNextPage,
    isLoading: isLoadingEvents,
    isFetchingNextPage,
  }: any = usePendingEvents({ search });
  const { isLoading, mutate } = useUpdateEventStatus();

  // @ts-ignore
  const events = data?.pages?.map((e: any) => e.data.data).flat() as any[];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeData, setActiveData] = useState({});
  const [modifyingEventId, setModifyingEventId] = useState<number | null>(null);

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === events.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(events.map((e: any) => e.id)));
    }
  };

  const handleBulkExport = async () => {
    if (selectedIds.size === 0) {
      toast.error("No events selected");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000/api/v1'}/imports/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
        },
        body: JSON.stringify({
          events: events
            .filter((e: any) => selectedIds.has(e.id))
            .map((event: any) => ({
              name: event.name,
              description: event.description || event.name,
              categoryId: event.eventCategory?.id || '',
              banner: event.image,
              latitude: event.latitude || 0,
              longitude: event.longitude || 0,
              address: event.address || 'Address not specified',
              startDateTime: event.startTime,
              endDateTime: event.endTime || event.startTime,
              timezone: event.timezone || 'UTC',
              ticketType: event.ticketType || 'free',
              currency: event.currency || 'USD',
              isPublic: event.isPublic !== false,
              canViewMembers: event.canViewMembers !== false,
            })),
        }),
      });

      if (!response.ok) {
        throw new Error('Export failed');
      }

      const result = await response.json();
      toast.success(`Exported ${result.events?.length || 0} events successfully`);
      setSelectedIds(new Set());
    } catch (error) {
      toast.error('Failed to export events');
      console.error('Export error:', error);
    }
  };

  const toggleDropdown = (data: any) => {
    setIsDropdownOpen(!isDropdownOpen);
    setActiveData(data);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const dropDownData = [
    {
      title: (
        <p className="text-[#041549]" onClick={openModal}>
          View Event
        </p>
      ),
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.4"
            fillRule="evenodd"
            clip-rule="evenodd"
            d="M11.8246 4.03054C12.9628 4.90909 13.9319 6.1962 14.6278 7.8059C14.6798 7.92808 14.6798 8.07095 14.6278 8.18731C13.2359 11.4067 10.7579 13.3332 8.00016 13.3332H7.99366C5.24244 13.3332 2.76439 11.4067 1.37252 8.18731C1.32049 8.07095 1.32049 7.92808 1.37252 7.8059C2.76439 4.58586 5.24244 2.6665 7.99366 2.6665H8.00016C9.37902 2.6665 10.6863 3.14489 11.8246 4.03054ZM5.39854 7.99984C5.39854 9.42206 6.56276 10.5792 8.00016 10.5792C9.43106 10.5792 10.5953 9.42206 10.5953 7.99984C10.5953 6.57115 9.43106 5.41398 8.00016 5.41398C6.56276 5.41398 5.39854 6.57115 5.39854 7.99984Z"
            fill="#200E32"
          />
          <path
            d="M9.62102 7.998C9.62102 8.88365 8.89256 9.6077 8.0015 9.6077C7.10394 9.6077 6.37549 8.88365 6.37549 7.998C6.37549 7.8881 6.3885 7.78531 6.40801 7.68188H6.44053C7.16248 7.68188 7.74785 7.11299 7.77386 6.40123C7.84541 6.38895 7.92346 6.38184 8.0015 6.38184C8.89256 6.38184 9.62102 7.10588 9.62102 7.998Z"
            fill="#200E32"
          />
        </svg>
      ),
    },
  ];

  return (
    <div>
      <DashboardAction textValue={search} onChangeText={setSearch} />
      {selectedIds.size > 0 && (
        <div className="mb-4 flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {selectedIds.size} event{selectedIds.size > 1 ? 's' : ''} selected
          </span>
          <button
            onClick={handleBulkExport}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Export Selected
          </button>
        </div>
      )}
      {/* @ts-ignore */}
      <DefaultTable header={header}>
        {isLoadingEvents && <Spinner />}
        {events && events.length > 0 && (
          <tr>
            <td className={style}>
              <input
                type="checkbox"
                checked={selectedIds.size === events.length && events.length > 0}
                onChange={toggleSelectAll}
                className="w-4 h-4"
              />
            </td>
            <td colSpan={header.length - 1} className={style}>
              <span className="text-sm text-gray-600">Select All</span>
            </td>
          </tr>
        )}
        {events?.map((_: any, key: number) => {
          return (
            <tr key={key}>
              <td className={style}>
                <input
                  type="checkbox"
                  checked={selectedIds.has(_.id)}
                  onChange={() => toggleSelect(_.id)}
                  className="w-4 h-4"
                />
              </td>
              <td className={style}>
                <div className="flex gap-5 items-center">
                  <img
                    src={_?.image}
                    className="w-[3em] h-[3em] bg-gray-500 rounded-full object-cover"
                  ></img>
                  <div>
                    <h3>{_.name}</h3>
                  </div>
                </div>
              </td>
              <td className={style}>
                <LinkWithProgress href={`/dashboard/users/${_?.user?.id}`}>
                  <h3 className="underline">{_?.user?.username}</h3>
                </LinkWithProgress>
              </td>
              <td className={style}>
                <h3>{_?.eventCategory?.name}</h3>
              </td>
              <td className={style}>
                <h3>{moment(_?.startTime).format("MMM DD YYYY")}</h3>
              </td>
              <td className={`whitespace-no-wrap border-b border-gray-300`}>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <div className="flex items-center justify-space-around">
                    <button
                      onClick={() => {
                        setModifyingEventId(_?.id);
                        mutate(
                          { eventId: _?.id, status: EventStatus.PUBLISHED },
                          {
                            onSuccess() {
                              toast.success("Event approved successfully");
                              refetch();
                            },
                            onSettled() {
                              setModifyingEventId(null);
                            },
                          }
                        );
                      }}
                    >
                      <Image
                        src="/images/icons/dashboard/table/tick.svg"
                        width={80}
                        height={80}
                        alt=""
                      />
                    </button>

                    <button
                      onClick={() => {
                        mutate(
                          { eventId: _?.id, status: EventStatus.CANCELLED },
                          {
                            onSuccess() {
                              toast.success("Event Rejected successfully");
                              refetch();
                            },

                            onSettled() {
                              setModifyingEventId(null);
                            },
                          }
                        );
                      }}
                    >
                      <Image
                        src="/images/icons/dashboard/table/times.svg"
                        width={80}
                        height={80}
                        alt=""
                      />
                    </button>
                  </div>
                )}
              </td>
              <td className={style}>
                <Dropdown
                  view={
                    <Image
                      src="/images/icons/dashboard/table/more.svg"
                      width={30}
                      height={33}
                      alt=""
                      onClick={() => toggleDropdown(_)}
                    />
                  }
                >
                  {dropDownData.map(({ title, icon }, index) => (
                    <Fragment key={index}>
                      <div className="flex gap-3 py-[.5em]">
                        {icon}
                        {title}
                      </div>
                    </Fragment>
                  ))}
                </Dropdown>
              </td>
            </tr>
          );
        })}
      </DefaultTable>
      {hasNextPage && (
        <TablePagination
          onFetchMore={fetchNextPage}
          loading={isFetchingNextPage}
        />
      )}

      {events?.length < 1 && !isLoading && <NoData />}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <EventDetails event={activeData as any} />
      </Modal>
    </div>
  );
};

export default PendingEvents;
