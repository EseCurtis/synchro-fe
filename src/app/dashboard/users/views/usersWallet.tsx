import React, { Fragment, useEffect, useState } from "react";
import DefaultTable from "@/app/_components/table/defaultTable";
import { TABLE_STYLE } from "@/constant";
import { table } from "@/utils/contents/dummy/table";
import Image from "next/image";
import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import WalletStat from "../components/walletStat";
import { formatNumber } from "@/utils/formatNumber";
import { useTQuery } from "@/hooks/api/useTQuery";
import { useParams } from "next/navigation";
import moment from "moment";
import TransactionIcon from "@/app/_components/wallet/TransactionIcon";

const header = ["Transaction ID", "Amount", "Source", "Recipiant", "Date"];

const ViewUsersWallet = () => {
  const params = useParams();
  const id = params.id;
  const [walletHistory, setWalletHistory] = useState<any>([]);

  const {data: walletResponse }: any = useTQuery({
    url: `/wallet/history?userId=${id}&page=1&limit=10`,
    queryKey: ["data"],
  });

  useEffect(() => {
    setWalletHistory(walletResponse?.data);
  }, [walletResponse]);

  useEffect(() => {
    console.log(walletHistory);
  }, [walletHistory]);

  return (
    <div>
      <div className="flex gap-5 my-[4em]">
        <WalletStat walletResponse={walletResponse}/>
      </div>

      <div className="my-[3em]">
        <h1 className="font-bold">Wallet history</h1>
        <DashboardAction />
        {/* @ts-ignore */}
        <DefaultTable header={header}>
          {walletHistory?.data! && walletHistory?.data?.map((_: any, key: number) => {
              return (
                <tr key={key}>
                  <td className={TABLE_STYLE}>
                    <div className="flex gap-5 items-center justify-start w-full">
                      <div className="grid">
                        <TransactionIcon transactionType={_?.transactionType}/>
                      </div>
                      <h3 className="text-sm col-span-1">{_?.id}</h3>
                    </div>
                  </td>
                  <td className={TABLE_STYLE}>
                    <h3>{formatNumber(_?.amount)}</h3>
                  </td>
                  <td className={TABLE_STYLE}>
                    <h3>{_?.paymentMethod}</h3>
                  </td>
                  <td className={TABLE_STYLE}>
                    <h3>{_?.paymentMethod}</h3>
                  </td>
                  <td className={TABLE_STYLE}>
                    <h3>{moment(_?.createdAt).format("MMM DD YYYY h:m:s")}</h3>
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
