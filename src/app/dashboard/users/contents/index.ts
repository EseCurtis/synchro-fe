import {
  eventTotalTicketIcon,
  titcketValueIcon,
} from "@/app/_components/icons/preview/eventsStatIcons";
import {
  bookedServiceIcon,
  serviceCreatedIcon,
  serviceIncomeIcon,
  totalServiceBookedIcon,
} from "@/app/_components/icons/preview/serviceStatIcon";
import {
  userFollowersIcon,
  userBlockedIcon,
  userFollowingIcon,
} from "@/app/_components/icons/preview/usersStatIcon";
import {
  bookedValueIcon,
  bookedVenueIcon,
  totalVenueIcon,
  venueCreatedIcon,
} from "@/app/_components/icons/preview/venuesStatIcon";

export const userViewData = [
  {
    title: "Total Followers",
    icon: userFollowersIcon,
    amount: 3400,
  },
  {
    title: "Total Following",
    icon: userFollowingIcon,
    amount: 10000,
  },
  {
    title: "Total Blocked",
    icon: userBlockedIcon,
    amount: 400,
  },
];

export const eventViewData = [
  {
    title: "Invited Events",
    icon: userFollowersIcon,
    amount: 3400,
  },
  {
    title: "Events Attended",
    icon: userFollowersIcon,
    amount: 2000,
  },
  {
    title: "Tickets Bought",
    icon: eventTotalTicketIcon,
    amount: 10000,
  },
  {
    title: "Total Tickets Values",
    icon: titcketValueIcon,
    amount: 400,
  },
];

export const venueViewData = [
  {
    title: "Booked Venues",
    icon: bookedVenueIcon,
    amount: 3400,
  },
  {
    title: "Total Booked Value",
    icon: bookedValueIcon,
    amount: 2000,
  },

  {
    title: "Venues Created",
    icon: venueCreatedIcon,
    amount: 400,
  },
  {
    title: "Total venue income",
    icon: totalVenueIcon,
    amount: 10000,
  },
];

export const serviceViewData = [
  {
    title: "Booked Venues",
    icon: bookedServiceIcon,
    amount: 400,
  },
  {
    title: "Total Booked Value",
    icon: totalServiceBookedIcon,
    amount: 31000,
  },

  {
    title: "Venues Created",
    icon: serviceCreatedIcon,
    amount: 93212,
  },
  {
    title: "Total venue income",
    icon: serviceIncomeIcon,
    amount: 90218,
  },
];
