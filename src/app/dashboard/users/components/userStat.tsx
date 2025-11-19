import { cn, formatNumber } from "@/utils/formatNumber";
import { FC, ReactNode } from "react";

interface IUserProps {
  icon: ReactNode;
  title: string;
  amount: number;
  loading?: boolean;
}

const UserStat: FC<IUserProps> = ({ icon, title, amount, loading }) => {
  return (
    <div>
      <div className="flex h-[67px] gap-4 items-center  w-[250px]">
        <div>{icon}</div>
        <div>
          <p className="text-second_primary_text">{title}</p>
          <h1 className={cn(loading ? "bg-slate-50 rounded-lg text-transparent" : "" ,"text-[25px] my-3 font-black leading-[30px]")}>
            {formatNumber(amount)}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default UserStat;
