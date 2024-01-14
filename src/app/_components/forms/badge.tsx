import React, { FC } from "react";

interface IPropsBadge {
  status: "Active" | "Inactive" | "Disabled" | "Pending";
  label?: string
}

const Badge: FC<IPropsBadge> = ({ status, label }: IPropsBadge) => {
  let badge_status;
  let text_col;
  if (status === "Active") {
    badge_status = "#2EB8721F";
    text_col = "text-success_text";
  } else if (status === "Pending") {
    badge_status = "rgba(242, 153, 74, 0.12)";
    text_col = "text-pending_text";
  } else {
    badge_status = "blue";
  }
  return (
    <div
      className={
        " w-[fit-content] px-[15px] flex justify-center rounded-xl py-[2px] "
      }
      style={{
        background: badge_status,
      }}
    >
      <p className={`font-600  ${text_col}`}>{label || status}</p>
    </div>
  );
};

export default Badge;
