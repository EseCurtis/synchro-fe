import { profileToUser } from "@/v2/helpers/common.helpers";
import { AdminVenue } from "@/v2/types/venue.types";
import { UserAvatarV2 } from "@/v2/components/common/avatar.component";
import { BiMapPin, BiCalendar, BiTime } from "react-icons/bi";

type Props = {
  venue: AdminVenue;
};

export default function VenueDetails({ venue }: Props) {
  const owner = venue.owner ? profileToUser(venue.owner) : undefined;

  return (
    <div className="space-y-6">
      <VenueHero venue={venue} ownerUsername={owner?.username} />
      <VenueMeta venue={venue} owner={owner} />
      <VenuePricing venue={venue} />
      <VenueAmenities venue={venue} />
      <VenueOperatingHours venue={venue} />
    </div>
  );
}

function VenueHero({
  venue,
  ownerUsername,
}: {
  venue: AdminVenue;
  ownerUsername?: string;
}) {
  const coverImage = venue.images?.[0];
  return (
    <div className="space-y-3">
      <div className="h-40 w-full overflow-hidden rounded-lg bg-gray-200">
        {coverImage ? (
          <img
            src={coverImage}
            alt={venue.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            No media
          </div>
        )}
      </div>
      <div>
        <h2 className="text-xl font-semibold">{venue.title}</h2>
        <p className="text-sm text-gray-500">
          Hosted by @{ownerUsername ?? "synchro-assistant"}
        </p>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <BiMapPin />
        <span>
          {venue.address}, {venue.city}, {venue.country}
        </span>
      </div>
      <p className="text-sm text-gray-700">{venue.description}</p>
    </div>
  );
}

function VenueMeta({
  venue,
  owner,
}: {
  venue: AdminVenue;
  owner?: ReturnType<typeof profileToUser>;
}) {
  return (
    <section className="rounded-lg border border-gray-100 p-4">
      <h3 className="mb-4 text-sm font-semibold uppercase text-gray-500">
        Overview
      </h3>
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <MetaItem label="Type" value={venue.type} />
        <MetaItem label="Capacity" value={`${venue.capacity} guests`} />
        <MetaItem label="Size" value={`${venue.size.toLocaleString()} sq ft`} />
        <MetaItem label="Status" value={venue.status} />
        <MetaItem
          label="Categories"
          value={venue.suitableEventCategories?.join(", ")}
        />
        <MetaItem label="Rules" value={venue.venueRules?.join(", ") || "N/A"} />
      </div>
      {owner && (
        <div className="mt-6 flex items-center gap-3 rounded-lg border border-gray-100 p-3">
          <UserAvatarV2 user={owner} size={32} />
          <div className="text-sm">
            <p className="font-medium">
              {owner.firstName || owner.lastName
                ? `${owner.firstName ?? ""} ${owner.lastName ?? ""}`.trim()
                : owner.username}
            </p>
            <p className="text-xs text-gray-500">@{owner.username}</p>
          </div>
        </div>
      )}
    </section>
  );
}

function VenuePricing({ venue }: { venue: AdminVenue }) {
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: venue.currency || "USD",
  });

  return (
    <section className="rounded-lg border border-gray-100 p-4">
      <h3 className="mb-4 text-sm font-semibold uppercase text-gray-500">
        Pricing
      </h3>
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        {venue.hourlyRate && (
          <div className="flex items-center gap-2">
            <BiTime />
            <div>
              <p className="text-xs text-gray-500">Hourly</p>
              <p>{formatter.format(Number(venue.hourlyRate))}/hr</p>
            </div>
          </div>
        )}
        {venue.dailyRate && (
          <div className="flex items-center gap-2">
            <BiCalendar />
            <div>
              <p className="text-xs text-gray-500">Daily</p>
              <p>{formatter.format(Number(venue.dailyRate))}/day</p>
            </div>
          </div>
        )}
        {venue.cleaningFee && (
          <MetaItem
            label="Cleaning Fee"
            value={formatter.format(Number(venue.cleaningFee))}
          />
        )}
        {venue.minimumHours && (
          <MetaItem label="Minimum Hours" value={`${venue.minimumHours} hrs`} />
        )}
      </div>
    </section>
  );
}

function VenueAmenities({ venue }: { venue: AdminVenue }) {
  if (!venue.amenities?.length) return null;

  return (
    <section className="rounded-lg border border-gray-100 p-4">
      <h3 className="mb-4 text-sm font-semibold uppercase text-gray-500">
        Amenities
      </h3>
      <div className="flex flex-wrap gap-2 text-xs text-gray-700">
        {venue.amenities.map((amenity) => (
          <span
            key={amenity}
            className="rounded-full border border-gray-200 px-3 py-1"
          >
            {amenity}
          </span>
        ))}
      </div>
    </section>
  );
}

function VenueOperatingHours({ venue }: { venue: AdminVenue }) {
  const days = Object.entries(venue.operatingHours ?? {});
  if (!days.length) return null;

  return (
    <section className="rounded-lg border border-gray-100 p-4">
      <h3 className="mb-4 text-sm font-semibold uppercase text-gray-500">
        Operating Hours
      </h3>
      <div className="space-y-2 text-sm text-gray-700">
        {days.map(([day, schedule]) => (
          <div key={day} className="flex items-center justify-between">
            <span className="capitalize text-gray-500">{day}</span>
            <span>
              {schedule.isOpen
                ? `${schedule.openTime} - ${schedule.closeTime}`
                : "Closed"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function MetaItem({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs uppercase text-gray-400">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
