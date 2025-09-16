import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import DefaultTable from "@/app/_components/table/defaultTable";
import TablePagination from "@/app/_components/table/tablePagination";
import TransactionIcon from "@/app/_components/wallet/TransactionIcon";
import { TABLE_STYLE } from "@/constant";
import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import { formatNumber } from "@/utils/formatNumber";
import moment from "moment";
import Image from "next/image";
import { useParams } from "next/navigation";
import WalletStat from "../components/walletStat";

const header = ["Transaction ID", "Amount", "Source", "Recipiant", "Date"];

const ViewUsersWallet = () => {
  const params = useParams();
  const id = params.id;

  const {
    data: walletResponse,
    fetchNextPage,
    isFetchingNextPage,
  }: any = usePaginatedQuery({
    url: `/admin/users/${id}/wallet/history`,
    queryKey: ["wallet", "user-wallet-history"],
    enabled: true,
  });

  const walletHistory = walletResponse?.pages
    ?.map((e: any) => e.data.data)
    .flat() as any[];


  return (
    <div>
      <div className="flex gap-5 my-[4em]">
        <WalletStat walletHistory={walletHistory} />
      </div>

      <div className="my-[3em]">
        <h1 className="font-bold">Wallet history</h1>
        <DashboardAction />
        {/* @ts-ignore */}
        <DefaultTable header={header}>
          {walletHistory &&
            walletHistory?.map((_: any, key: number) => {
              return (
                <tr key={key}>
                  <td className={TABLE_STYLE}>
                    <div className="flex gap-5 items-center justify-start w-full">
                      <div className="grid">
                        <TransactionIcon transactionType={_?.transactionType} />
                      </div>
                      <h3 className="text-sm col-span-1">{_?.id}</h3>
                    </div>
                  </td>
                  <td className={TABLE_STYLE}>
                    <h3>${formatNumber(_?.amount)}</h3>
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

        {walletHistory?.length > 0 ? (
          <TablePagination
            loading={isFetchingNextPage}
            onFetchMore={fetchNextPage}
          />
        ) : (
          <p className="pt-4 text-center">No data to display</p>
        )}
      </div>
    </div>
  );
};

export default ViewUsersWallet;
