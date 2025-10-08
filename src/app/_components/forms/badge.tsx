import { cn } from "@/utils/formatNumber";
import { FC } from "react";

interface IPropsBadge {
  status:
    | "Active"
    | "Inactive"
    | "Disabled"
    | "Pending"
    | "approved"
    | "shiny"
    | any;
  size?: "small";
  label?: string;
}

const Badge: FC<IPropsBadge> = ({ status, label, size }: IPropsBadge) => {
  let badge_status;
  let text_col;

  if (status === "Active" || status === "approved" || status === "resolved") {
    badge_status = "#2EB8721F";
    text_col = "text-success_text";
  } else if (status === "Pending" || status === "pending") {
    badge_status = "rgba(242, 153, 74, 0.12)";
    text_col = "text-pending_text";
  } else if (status == "shiny" || status == "under_review") {
    badge_status = "#c084fc3A";
    text_col = " text-purple-400";
  } else if (status == "rejected" ) {
    badge_status = "#f00f0031";
    text_col = " text-red-400";
  } else {
    badge_status = "#f1c40f30";
    text_col = " text-orange-400";
  }

  return (
    <div
      className={cn(
        " w-[fit-content] text-purple-400 px-[15px] flex justify-center rounded-full py-[2px]",
        size === "small" ? "px-[7px] text-xs" : ""
      )}
      style={{
        background: badge_status,
      }}
    >
      <p className={`font-600 whitespace-nowrap  ${text_col}`}>
        {label || status}
      </p>
    </div>
  );
};

export default Badge;
