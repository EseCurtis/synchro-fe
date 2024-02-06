import moment from "moment";
import Image from "next/image";
import { TABLE_STYLE } from "@/constant";

interface IOtherEvents {
  _: any;
  openModal: any;
}

const Tickets: React.FC<IOtherEvents> = ({ _, openModal }) => {
    const eventTicket = _?.eventTicket;
    const event = _?.eventTicket?.event;

   // console.log(_);
  return (
    <tr>
      <td className={TABLE_STYLE}>
        <div className="flex gap-5 items-center">
          <div className="w-[5em] h-[3em] flex items-center justify-center bg-gray-500 rounded-md overflow-clip">
            <Image src={event?.image} width={140} height={100} alt="lll" />
          </div>
          <div>
            <h3>{event?.name}</h3>
            <p className="text-second_primary_text"></p>
          </div>
        </div>
      </td>
      <td className={TABLE_STYLE}>
        <h3>
          {eventTicket?.name}
        </h3>
      </td>
      <td className={TABLE_STYLE}>
        <h3>{eventTicket?.currencyLabel}{eventTicket?.price}</h3>
      </td>
      <td className={TABLE_STYLE}>
        <h3>{moment(eventTicket?.createdAt).format("MMM DD YYYY h:m:s")}</h3>
      </td>
      <td className={TABLE_STYLE}>
        <Image
          src="/images/icons/dashboard/table/more.svg"
          width={32}
          height={11}
          alt=""
          onClick={() => openModal(_)}
          className="cursor-pointer"
        />
      </td>
    </tr>
  );
};


export default Tickets;