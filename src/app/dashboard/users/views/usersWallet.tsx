import React, { Fragment } from "react";
import DefaultTable from "@/app/_components/table/defaultTable";
import { TABLE_STYLE } from "@/constant";
import { table } from "@/utils/contents/dummy/table";
import Image from "next/image";
import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import WalletStat from "../components/walletStat";
import { formatNumber } from "@/utils/formatNumber";

const header = ["Transaction ID", "Amount", "Source", "Recipiant", "Date"];

const ViewUsersWallet = () => {
  return (
    <div>
      <div className="flex gap-5 my-[4em]">
        <WalletStat />
      </div>

      <div className="my-[3em]">
        <h1 className="font-bold">Wallet history</h1>
        <DashboardAction />
        {/* @ts-ignore */}
        <DefaultTable header={header}>
          {table?.map((_, key: number) => {
            return (
              <tr key={key}>
                <td className={TABLE_STYLE}>
                  <div className="flex gap-5 items-center">
                    <div className="w-[3em] h-[3em] bg-gray-500 rounded-full"></div>
                    <div>
                      <h3>31fc55d4-5a5b-4346-99a0</h3>
                    </div>
                  </div>
                </td>
                <td className={TABLE_STYLE}>
                  <h3>{formatNumber(1000)}</h3>
                </td>
                <td className={TABLE_STYLE}>
                  <h3>Stripe</h3>
                </td>
                <td className={TABLE_STYLE}>
                  <h3>Sonya Ganod</h3>
                </td>
                <td className={TABLE_STYLE}>
                  <h3>2:32pm. May 3rd, 2023</h3>
                </td>
                <td className={TABLE_STYLE}>
                  <Image
                    src="/images/icons/dashboard/table/more.svg"
                    width={32}
                    height={11}
                    alt=""
                  />
                </td>
              </tr>
            );
          })}
        </DefaultTable>
      </div>
    </div>
  );
};

export default ViewUsersWallet;
