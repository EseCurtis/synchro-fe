import React, { FC } from "react";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import { MdArrowOutward } from "react-icons/md";

interface TransactionIconProps {
  transactionType: string;
}

const TransactionIcon: FC<TransactionIconProps> = ({ transactionType }) => {
  const getIcon = (type: string) => {
    switch (type) {
      // case "quote_payment":
      //   return <FaMoneyCheckAlt />;
      case "fundings":
        return <MdArrowOutward />;
      // case "event-ticket":
      //   return <FaTicketAlt />;
      case "booking_refund":
        return <GoArrowUpRight />;
      // case "booking_payment":
      //   return <FaWallet />;
      // Add more cases for other transaction types if needed
      default:
        return <GoArrowDownLeft />;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      // case "quote_payment":
      //   return "bg-blue-200 text-blue-500";
      case "fundings":
        return "bg-green-200 text-green-500";
      // case "event-ticket":
      //   return "bg-purple-200 text-purple-500";
      case "booking_refund":
        return "bg-green-200 text-green-500";
      // case "booking_payment":
      //   return "bg-pink-200 text-pink-500";
      // // Add more cases for other transaction types if needed
      default:
        return "bg-pink-200 text-pink-500";
    }
  };

  const iconColor = getIconColor(transactionType);

  return (
    <div className={`block w-[3em] h-[3em] rounded-full ${iconColor}`}>
      <div className={`flex items-center justify-center w-full h-full`}>
        {getIcon(transactionType)}
      </div>
    </div>
  );
};

export default TransactionIcon;
