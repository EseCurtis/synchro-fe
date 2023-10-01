const commaSeperator = (num: string) => {
  return String(num).replace(/^\d+(?=.|$)/, function (int) {
    return int.replace(/(?=(?:\d{3})+$)(?!^)/g, ',');
  });
};

export const formatAmount = (
  value: number,
  decimalPlaces?: number,
  kFormatter?: boolean
) => {
  if (!kFormatter && value < 100_000_000_000) {
    return commaSeperator(
      Number(Math.sign(value) * Math.abs(value)).toFixed(decimalPlaces)
    );
  }

  // I hate it too
  return Math.abs(value) > 999999999999999
    ? Math.sign(value) *
        Number((Math.abs(value) / 1000000000000000).toFixed(decimalPlaces)) +
        'Z'
    : Math.abs(value) > 999999999999
    ? Math.sign(value) *
        Number((Math.abs(value) / 1000000000000).toFixed(decimalPlaces)) +
      'T'
    : Math.abs(value) > 999999999
    ? Math.sign(value) *
        Number((Math.abs(value) / 1000000000).toFixed(decimalPlaces)) +
      'B'
    : Math.abs(value) > 999999
    ? Math.sign(value) *
        Number((Math.abs(value) / 1000000).toFixed(decimalPlaces)) +
      'M'
    : Math.abs(value) > 999
    ? Math.sign(value) *
        Number((Math.abs(value) / 1000).toFixed(decimalPlaces)) +
      'K'
    : Number(Math.sign(value) * Math.abs(value)).toFixed(decimalPlaces);
};

export const sanitizeAmount = ({
  value,
  returnTrueAmount,
}: {
  value: string;
  returnTrueAmount?: boolean;
}) => {
  let val = value ? value.split(',').join('') : '';
  val = val.replace(/[^0-9]/g, '');

  if (!val || (val?.length === 1 && val.charAt(0) === '0')) return '';
  const amount = isNaN(Number(val)) || !val ? '' : String(parseInt(val, 10));

  if (returnTrueAmount) {
    const trueAmount = `${amount.substring(
      0,
      amount?.length - 2
    )}.${amount.substring(amount?.length - 2)}`;
    return trueAmount;
  }

  return amount;
};
