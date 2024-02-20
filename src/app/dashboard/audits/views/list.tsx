import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import React, { Fragment } from "react";
import Audit_Box from "../components/audit_box";
import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import moment from "moment";
import TablePagination from "@/app/_components/table/tablePagination";
import groupByDate from "@/helpers/groupByDate";

const AuditList = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    usePaginatedQuery({
      url: "/report/audit-trails",
      queryKey: ["audits"],
      enabled: true,
    });

  const audits = data?.pages?.map((e: any) => e.data.data).flat() as any[];

  // group by 5 mins
  const grouped = groupByDate(audits)

  //console.log(grouped)


  return (
    <div>
      <DashboardAction />
      {grouped?.map((_: any, key: number) => (
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
