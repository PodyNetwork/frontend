import { formatUnits } from "viem";

export function formatPoints(points: string | number | bigint, decimals: number = 18): string {
    const formatted = Number(formatUnits(BigInt(points), decimals));
    
    const truncated = Math.floor(formatted);

    if (truncated >= 1_000_000_000) {
        return `${Math.floor(truncated / 1_000_000_000)}b`; 
    } else if (truncated >= 1_000_000) {
        return `${Math.floor(truncated / 1_000_000)}m`;
    } else {
        return `${truncated}`;
    }
}

