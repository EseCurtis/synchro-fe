import { Button } from "@/app/_components/button";
import Input from "@/app/_components/input_fields";
import { useSuspendUser } from "@/hooks/api/v2/users";
import { BusinessProfile } from "@/v2/types/service.types";
import { useState } from "react";
import { toast } from "react-toastify";

const suspendIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.4"
      d="M21.9999 12C21.9999 17.524 17.5229 22 11.9999 22C6.47689 22 1.99989 17.524 1.99989 12C1.99989 6.478 6.47689 2 11.9999 2C17.5229 2 21.9999 6.478 21.9999 12Z"
      fill="#F2994A"
    />
    <path
      fill-rule="evenodd"
      clipRule="evenodd"
      d="M12.87 12.6309C12.87 13.1129 12.477 13.5059 11.995 13.5059C11.513 13.5059 11.12 13.1129 11.12 12.6309V8.21094C11.12 7.72894 11.513 7.33594 11.995 7.33594C12.477 7.33594 12.87 7.72894 12.87 8.21094V12.6309ZM11.125 15.8037C11.125 15.3217 11.516 14.9287 11.995 14.9287C12.488 14.9287 12.88 15.3217 12.88 15.8037C12.88 16.2857 12.488 16.6787 12.005 16.6787C11.52 16.6787 11.125 16.2857 11.125 15.8037Z"
      fill="#F2994A"
    />
  </svg>
);

const SuspendUser = ({ user, onClose = () => {} }: { user: BusinessProfile, onClose?: any }) => {
  const { mutate, isLoading } = useSuspendUser();

  const [reason, setReason] = useState("");

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="font-bold flex gap-2">{suspendIcon} Suspend User</h3>

          <div className="form items-left mt-4">
            <p>
              Are you sure you want to suspend <b>{user?.username}?</b> They
              will be restricted from using the system.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Input
            placeholder="Select option"
            name="reasons"
            label="Reasons for suspension"
            onChange={(e) => {
              setReason(e.target.value);
            }}
          />

          <Input
            placeholder="Select option"
            name="reasons"
            label="Suspension duration"
            type="datetime-local"
          />
        </div>
      </div>
      <div className="mt-5 flex gap-4 items-center">
        <Button
          style={{ background: "#fac000" }}
          isLoading={isLoading}
          onClick={() => {
            mutate({
              userId: user?.user?.id,
              reason: reason,
            }, {
              onSuccess(){
                toast.success("User suspended")
                onClose()
              }
            });
          }}
        >
          Suspend
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
};

export default SuspendUser;
