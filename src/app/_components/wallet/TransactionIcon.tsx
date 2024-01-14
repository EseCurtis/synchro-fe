import React, { FC } from "react";
import {
  FaMoneyCheckAlt,
  FaMoneyBill,
  FaTicketAlt,
  FaUndo,
  FaWallet,
} from "react-icons/fa";

interface TransactionIconProps {
  transactionType: string;
}

const TransactionIcon: FC<TransactionIconProps> = ({ transactionType }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "quote_payment":
        return <FaMoneyCheckAlt />;
      case "fundings":
        return <FaMoneyBill />;
      case "event-ticket":
        return <FaTicketAlt />;
      case "booking_refund":
        return <FaUndo />;
      case "booking_payment":
        return <FaWallet />;
      // Add more cases for other transaction types if needed
      default:
        return null;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "quote_payment":
        return "bg-blue-200 text-blue-500";
      case "fundings":
        return "bg-green-200 text-green-500";
      case "event-ticket":
        return "bg-purple-200 text-purple-500";
      case "booking_refund":
        return "bg-orange-200 text-orange-500";
      case "booking_payment":
        return "bg-pink-200 text-pink-500";
      // Add more cases for other transaction types if needed
      default:
        return "bg-gray-200";
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
