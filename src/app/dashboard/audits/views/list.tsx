import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import { Spinner } from "@/app/_components/spinner/Spinner";
import TablePagination from "@/app/_components/table/tablePagination";
import groupByDate from "@/helpers/groupByDate";
import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import { Audit } from "@/v2/types/audits.types";
import { Fragment } from "react";
import Audit_Box from "../components/audit_box";

const AuditList = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    usePaginatedQuery({
      url: "/admin/reports/audit-trails",
      queryKey: ["audits"],
      enabled: true,
    });

  const audits = data?.pages?.map((e: any) => e.data.data).flat() as Audit[];

  // group by 5 mins
  const grouped = groupByDate(audits)

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <DashboardAction />
      {grouped?.map((_, key: number) => (
        <Fragment key={key}>
          <Audit_Box item={_} />
        </Fragment>
      ))}

      <TablePagination
        loading={isFetchingNextPage}
        onFetchMore={fetchNextPage}
      />
    </div>
  );
};

export default AuditList;
