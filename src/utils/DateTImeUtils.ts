function epochMillsToDayStr(epochMils: number): string {
    const date = new Date(+epochMils);
    const dayStr = date.toISOString().split("T")[0];
    return dayStr;
}

// 7200s => 2h 0m
function secondsToHoursMinutes(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
}

export { epochMillsToDayStr, secondsToHoursMinutes };
