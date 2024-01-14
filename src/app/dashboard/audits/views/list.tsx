import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import React, { Fragment } from "react";
import Audit_Box from "../components/audit_box";
import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import moment from "moment";
import TablePagination from "@/app/_components/table/tablePagination";

const AuditList = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    usePaginatedQuery({
      url: "/report/audit-trails",
      queryKey: ["audits"],
      enabled: true,
    });

  const audits = data?.pages?.map((e: any) => e.data.data).flat() as any[];

  // group by 5 mins

  // const grouped = audits?.reduce((acc: any, curr: any) => {
  //   const key = moment(curr.created_at).format("DD/MM/YYYY HH:mm");
  //   if (!acc[key]) {
  //     acc[curr.title] = [];
  //   }
  //   acc[curr.title].push(curr);
  //   return acc;
  // }, {});

  // console.log(grouped);

  return (
    <div>
      <DashboardAction />
      {audits?.map((_, key) => (
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
