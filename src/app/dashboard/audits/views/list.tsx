import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import React, { Fragment } from "react";
import Audit_Box from "../components/audit_box";

const AuditList = () => {
  return (
    <div>
      <DashboardAction />
      {[1, 2, 2, 2, 2, 2].map((_, key) => (
        <Fragment key={key}>
          <Audit_Box />
        </Fragment>
      ))}
    </div>
  );
};

export default AuditList;
