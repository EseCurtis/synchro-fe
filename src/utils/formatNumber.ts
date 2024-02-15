export const formatNumber = (num: number | string): string => {
  let addCurrency = false;

  if (typeof num === "string") {
    num = "00";
    if (num[0] === "$") {
      addCurrency = true;
      num = parseFloat(num.slice(1).replace(/,/g, ""));
    }
  }

  const numFormat = new Intl.NumberFormat();
  const formatted =(addCurrency ? "$" : "") + numFormat.format(num as number | bigint);
  return String((isNaN(Number(formatted))) ? 0 : formatted);
};
