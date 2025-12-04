import { AppToast } from "@/app/_components/AppToast";
import { Button } from "@/app/_components/button";
import { Spinner } from "@/app/_components/spinner/Spinner";
import { useDeleteFaq } from "@/hooks/api/faqs/use-admin-faqs";
import { Faq } from "@/v2/types/faq.types";
import { toast } from "react-toastify";

const deleteIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.4"
      d="M22 12C22 17.524 17.523 22 12 22C6.477 22 2 17.524 2 12C2 6.478 6.477 2 12 2C17.523 2 22 6.478 22 12Z"
      fill="#EB0000"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.8701 12.6309C12.8701 13.1129 12.4771 13.5059 11.9951 13.5059C11.5131 13.5059 11.1201 13.1129 11.1201 12.6309V8.21094C11.1201 7.72894 11.5131 7.33594 11.9951 7.33594C12.4771 7.33594 12.8701 7.72894 12.8701 8.21094V12.6309ZM11.1251 15.8037C11.1251 15.3217 11.5161 14.9287 11.9951 14.9287C12.4881 14.9287 12.8801 15.3217 12.8801 15.8037C12.8801 16.2857 12.4881 16.6787 12.0051 16.6787C11.5201 16.6787 11.1251 16.2857 11.1251 15.8037Z"
      fill="#EB0000"
    />
  </svg>
);

type Props = {
  faq: Faq;
  onClose?: () => void;
};

export default function DeleteFaq({ faq, onClose }: Props) {
  const { mutate, isLoading } = useDeleteFaq();

  const handleDelete = () => {
    mutate(faq.id, {
      onSuccess: () => {
        toast(<AppToast>FAQ deleted</AppToast>, { type: "success" });
        onClose?.();
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message ||
          "Unable to delete FAQ. Please try again.";
        toast(<AppToast>{message}</AppToast>, { type: "error" });
      },
    });
  };

  return (
    <div>
      <h3 className="font-bold flex gap-2 items-center">
        {deleteIcon} Delete FAQ
      </h3>

      <div className="form items-left mt-4">
        <p>
          Are you sure you want to delete “<b>{faq.question}</b>” from the FAQ
          section?
        </p>
      </div>

      <div className="mt-5 flex gap-4 items-center">
        <Button onClick={handleDelete} disabled={isLoading}>
          {isLoading ? <Spinner /> : "Delete"}
        </Button>
        <Button
          style={{ background: "white", color: "red" }}
          customClassName="text-red-500 border border-2 border-red-500"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
