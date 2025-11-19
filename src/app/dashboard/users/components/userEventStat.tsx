import { formatNumber } from "@/utils/formatNumber";
import React, { FC, ReactNode } from "react";

interface IEventStat {
  title: string;
  amount: number | string;
  icon: ReactNode;
}

const EventStat: FC<IEventStat> = ({ title, amount, icon }) => {
  return (
    <div>
      <div className="flex h-[67px] gap-4 items-center mb-5 w-[250px]">
        <div>{icon}</div>
        <div>
          <p className="text-second_primary_text">{title}</p>
          <h1 className="text-[25px] my-3 font-black leading-[30px]">
            {formatNumber(amount)}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default EventStat;
