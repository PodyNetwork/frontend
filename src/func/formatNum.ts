export function formatNum(value: number): string {
    if (!Number.isFinite(value)) return 'Invalid';
    
    const absValue = Math.abs(value);
    const formatter = new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 0
    });

    const thresholds = [
        { value: 1_000_000_000_000, suffix: 'T', divisor: 1_000_000_000_000 }, 
        { value: 1_000_000_000, suffix: 'B', divisor: 1_000_000_000 },        
        { value: 10_000_000, suffix: 'M', divisor: 1_000_000 }                
    ];

    for (const { value: threshold, suffix, divisor } of thresholds) {
        if (absValue >= threshold) {
            const scaled = value / divisor; 
            return `${formatter.format(scaled)}${suffix}`;
        }
    }

    // Format normally for values below 10 million
    return formatter.format(value);
}