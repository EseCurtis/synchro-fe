import { TABLE_STYLE } from "@/constant";
import { Event } from "@/v2/types/event.types";
import moment from "moment";
import Image from "next/image";
import EventCategory from "../../components/EventCategory";

interface IEventsCreated {
  _: Event;
  openModal: any;
}

const EventsCreated: React.FC<IEventsCreated> = ({ _, openModal }) => {
  return (
    <tr>
      <td className={TABLE_STYLE}>
        <div className="flex gap-5 items-center">
          <div className="w-[5em] h-[3em] flex items-center justify-center bg-gray-500 rounded-md overflow-clip">
            <Image src={_?.banner} width={140} height={100} alt="lll" />
          </div>
          <div>
            <h3>{_.name}</h3>
            <p className="text-second_primary_text"></p>
          </div>
        </div>
      </td>
      <td className={TABLE_STYLE}>
        <h3>
          <EventCategory categoryData={_.category} />
        </h3>
      </td>
      <td className={TABLE_STYLE}>
        <h3 className="text-sm">{_.address}</h3>
      </td>
      <td className={TABLE_STYLE}>
        <h3 className="text-sm">{moment(_.endDateTime).format("MMM DD YYYY h:m:s")}</h3>
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


export default EventsCreated;