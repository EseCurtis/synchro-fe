export const formatNumber = (num: number) => {
     const numFormat = new Intl.NumberFormat();
     return numFormat.format(num)
}