export const formatNumber = (num: number | string): string => {
  let addCurrency = false;

  if (typeof num === "string") {
    if (num[0] === "$") {
      addCurrency = true;
      num = parseFloat(num.slice(1).replace(/,/g, ""));
    }
  }

  const numFormat = new Intl.NumberFormat();
  return (addCurrency ? "$" : "") + numFormat.format(num as number | bigint);
};
