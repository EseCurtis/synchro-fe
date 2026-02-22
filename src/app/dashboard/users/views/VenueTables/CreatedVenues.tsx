import Badge from "@/app/_components/forms/badge";
import { TABLE_STYLE } from "@/constant";
import moment from "moment";

interface ICreatedVenues {
  venue: any;
  openModal: any;
}

const CreatedVenues = ({
  venue,
  openModal
}: ICreatedVenues) => {
  const formattedDateRanges =
    venue?.hours &&
    venue.hours.map((hour: any) => {
      const parsedHour = JSON.parse(hour);
      const startDate = moment(parsedHour.times[0].from);
      const endDate = moment(parsedHour.times[parsedHour.times.length - 1].to);
      return `${startDate.format("MMMM Do")} - ${endDate.format("Do, YYYY")}`;
    });
  return (
    <tr>
      <td className={TABLE_STYLE}>
        <div className="flex gap-5 items-center">
          <div className="w-[5em] h-[3em] flex items-center justify-center bg-gray-500 rounded-md overflow-clip">
            <img
              src={JSON.parse(venue.images[0])["url"]}
              width={140}
              height={100}
              alt="lll"
            />
          </div>
          <div>
            <h3>{venue.name}</h3>
            <p className="text-second_primary_text ">{venue.user.username}</p>
          </div>
        </div>
      </td>
      <td className={TABLE_STYLE}>
        <h3 className="text-[14px]">{venue.address}</h3>
      </td>
      <td className={TABLE_STYLE}>
        <h3 className="text-[14px]">${venue.hourlyRate}/hr</h3>
      </td>
      <td className={TABLE_STYLE}>
        <h3 className="text-[14px]">
          <Badge
            label={venue.status}
            status={venue.status === "approved" ? "Active" : "Inactive"}
          />
        </h3>
      </td>
      <td className={TABLE_STYLE}>
        <h3 className="text-[14px]">{formattedDateRanges[1]}</h3>
      </td>
      <td className={TABLE_STYLE}>
        <img
          src="/images/icons/dashboard/table/more.svg"
          width={62}
          height={21}
          alt=""
          onClick={() => openModal(venue)}
          className="cursor-pointer"
        />
      </td>
    </tr>
  );
};

export default CreatedVenues;
