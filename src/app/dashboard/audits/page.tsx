"use client";
import React, { useState } from "react";
import DashboardLayout from "@/app/layouts/dashboardLayout";
import AuditList from "./views/list";

const Audits = () => {
  return (
    <DashboardLayout title="Audits">
      <AuditList />
    </DashboardLayout>
  );
};

export default Audits;
