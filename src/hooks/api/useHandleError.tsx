import { AppToast } from "@/app/_components/AppToast";
import { toast } from "react-toastify";

export const useHandleError = () => {
  const handleError = (e: any, silent?: boolean, onClick?: () => void) => {
    let message: string;

    const statusCode = e?.response?.status;

    const supportCodes = [405];

    if (supportCodes.includes(statusCode)) {
      message = `An error occurred, please contact support`;
    } else if (e.message.includes("timeout of ")) {
      message = "Request timed out, please check your internet";
    } else {
      message = getErrorMessage(e);
    }

    if (!silent) {
      toast(<AppToast>{message}</AppToast>, {
        type: "warning",
        autoClose: 1000,
      });
    }
  };

  return { handleError };
};

export const getErrorMessage = (error: any): string => {
  if (error.response) {
    return (
      (error?.response?.data?.message?.length > 0 &&
        error?.response?.data?.message[0]?.messages?.length > 0 &&
        error?.response?.data?.message[0]?.messages[0]?.message) ||
      error?.response?.data?.message ||
      "An error occured"
    );
  } else if (error.request) {
    return error.request ? "Network error" : "Something went wrong";
  } else {
    return error.message ? error.message : "Something went wrong";
  }
};
