"use client";

import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import NoFaq from "@/app/_components/no_data/no_faq";
import TablePagination from "@/app/_components/table/tablePagination";
import { useAdminFaqs } from "@/hooks/api/faqs/use-admin-faqs";
import { Faq } from "@/v2/types/faq.types";
import { Fragment, useMemo, useState } from "react";
import { AddNewRoleComponent } from "../../roles/components/roles_box";
import FaqBox from "../components/faqBox";
import NewFaq from "../components/new_faq";

const statusFilters = [
  { label: "All", value: "all" },
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
];

export default function Faqs() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "published" | "draft"
  >("all");

  const isPublished =
    statusFilter === "all" ? undefined : statusFilter === "published";

  const {
    data,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useAdminFaqs({
    search,
    isPublished,
  });

  console.log("QUUENNNNNNN", data);

  const faqsx: Faq[] = useMemo(
    () =>
      (data?.pages || []).flatMap(
        (page: any) => page.data?.data ?? []
      ) as Faq[],
    [data?.pages]
  );

  const faqs = (data?.pages || []).flatMap((p: any) => p.data?.data ?? []);

  const showEmpty = !isLoading && faqs.length === 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <DashboardAction
          textValue={search}
          onChangeText={setSearch}
          isLoading={isFetching}
        />

        <div className="flex gap-2 rounded-full border border-gray-200 p-1">
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value as any)}
              className={`px-4 py-2 rounded-full text-sm ${
                statusFilter === filter.value
                  ? "bg-[#1f2937] text-white"
                  : "text-gray-600"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {showEmpty ? (
        <NoFaq />
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <Fragment key={faq.id}>
                <FaqBox faq={faq} />
              </Fragment>
            ))}
          </div>
          {hasNextPage && (
            <TablePagination
              loading={isFetchingNextPage}
              onFetchMore={fetchNextPage}
            />
          )}
          <div className="flex justify-center">
            <AddNewRoleComponent
              title="Click here to add new FAQ"
              modalProps={<NewFaq />}
            />
          </div>
        </div>
      )}
    </div>
  );
}
