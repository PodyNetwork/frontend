export const formatNumber = (num: number) => {
    const formatWithPrecision = (value: number) => {
      return value % 1 === 0 ? value.toFixed(0) : value.toPrecision(3);
    };
  
    if (num >= 1_000_000_000) {
      return formatWithPrecision(num / 1_000_000_000) + "B";
    } else if (num >= 1_000_000) {
      return formatWithPrecision(num / 1_000_000) + "M";
    } else if (num >= 1_000) {
      return formatWithPrecision(num / 1_000) + "K";
    }
    
    return num.toString();
  };
  