export const formatNumber = (num: number) => {
    const formatWithPrecision = (value: number) => {
      return Math.floor(value*Math.pow(10,2))/(Math.pow(10,2));
    };

    if(num >= 1_000_000_000_000) {
      return formatWithPrecision(num / 1_000_000_000_000) + "T";
    } else if (num >= 1_000_000_000) {
      return formatWithPrecision(num / 1_000_000_000) + "B";
    } else if (num >= 1_000_000) {
      return formatWithPrecision(num / 1_000_000) + "M";
    } else if (num >= 1_000) {
      return formatWithPrecision(num / 1_000) + "K";
    }
    
    return num.toString();
  };
  