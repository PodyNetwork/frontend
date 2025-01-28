export function formatAndTruncateCount(totalReferralsCount: number): string {
    const value = totalReferralsCount;

    if (value >= 1_000_000_000) {
        const result = value / 1_000_000_000;
        return formatDecimal(result) + "B";
    } else if (value >= 1_000_000) {
        const result = value / 1_000_000;
        return formatDecimal(result) + "M";
    } else {
        return value.toLocaleString(); // Format values below 1M with commas
    }
}

// Helper function to handle decimals
function formatDecimal(number: number): string {
    const rounded = parseFloat(number.toFixed(2)); 
    if (Number.isInteger(rounded)) {
        return rounded.toFixed(1).replace(/\.0$/, ""); 
    }
    return rounded.toString(); 
}
