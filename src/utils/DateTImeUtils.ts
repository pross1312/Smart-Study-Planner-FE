function epochMillsToDayStr(epochMils: number): string {
    const date = new Date(+epochMils);
    const dayStr = date.toISOString().split("T")[0];
    return dayStr;
}


// 125 minutes => 2h 5m
function minutesToHoursMinutes(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
}


export { epochMillsToDayStr, minutesToHoursMinutes };
