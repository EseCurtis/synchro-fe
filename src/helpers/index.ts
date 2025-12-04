export * from "./detectBrowser";
export * from "./filterEventsByDate";
export * from "./formatAmount";
export * from "./generateMonthData";
export * from "./generateTableEntries";
export * from "./getDateRange";
export * from "./getPlaceholderArray";
export * from "./grenerateColor";

//export const baseUrl = "https://typical-leelah-sparedot-91c8defe.koyeb.app/api/v1";
// export const baseUrl = "https://env-0465672.dal.togglebox.site";
export const baseUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://api.synchroapp.org/api/v1";
console.log("API URL:", baseUrl);
