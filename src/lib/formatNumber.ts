export const formatNumber = (num: number) => {
  const formatWithPrecision = (value: number) => {
    return Math.floor(value * Math.pow(10, 2)) / Math.pow(10, 2); // Round to 2 decimal places
  };

  if (num >= 1_000_000_000_000) {
    return formatWithPrecision(num / 1_000_000_000_000) + "T";
  } else if (num >= 1_000_000_000) {
    return formatWithPrecision(num / 1_000_000_000) + "B";
  } else if (num >= 10_000_000) {
    return formatWithPrecision(num / 1_000_000) + "M";
  } else {
    return num.toString(); 
  }
};
