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
  const grouped = audits?.reduce((acc: any, curr: any) => {
    const date: any = moment(curr.created_at);
    const roundedDate = moment(Math.floor(date / 300000) * 300000).format(
      "DD/MM/YYYY HH:mm"
    );

    curr.action = curr.title.split(" ").slice(1, -1).join(" ");

    let group = acc.find(
      (item: any) => item.date === roundedDate && item.title === curr.title
    );

    if (!group) {
      group = { title: curr.title, data: curr, date: moment(Math.floor(date / 300000) * 300000), trails: [] };
      acc.push(group);
    }


    group.trails.push(curr);

    return acc;
  }, []);


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
