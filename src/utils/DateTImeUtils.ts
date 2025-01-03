function epochMillsToDayStr(epochMils: number): string {
    const date = new Date(+epochMils);
    const dayStr = date.toISOString().split("T")[0];
    return dayStr;
}

function epochSecondsToDayStr(epochSeconds: number): string {
    const date = new Date(epochSeconds * 1000);
    const formattedDate = date.toISOString().slice(0, 19);
    return formattedDate;
}

// 7200s => 2h 0m
function secondsToHoursMinutes(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
}

function getStartOfDayEpochUTC(epochSeconds: number): number {
    const date = new Date(epochSeconds * 1000);
    const startOfDayUTC = Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate()
    );

    console.log("startOfDayUTC:", new Date(startOfDayUTC).toISOString());
    return Math.floor(startOfDayUTC / 1000);
}

function convertToEpochSeconds(datetimeStr: string) {
    // Replace the timezone abbreviation with the timezone offset to handle it correctly
    const formattedDatetime = datetimeStr.replace(/GMT([+\-]\d{4})/, "UTC$1");

    // Convert the datetime string to a Date object
    const date = new Date(formattedDatetime);

    // Return the epoch time in seconds
    return Math.floor(date.getTime() / 1000);
}
export {
    epochMillsToDayStr,
    secondsToHoursMinutes,
    epochSecondsToDayStr,
    getStartOfDayEpochUTC,
    convertToEpochSeconds,
};
