import moment from "moment";

function epochMillsToDayStr(epochMils: number): string {
    const date = new Date(+epochMils);
    const dayStr = date.toISOString().split("T")[0];
    return dayStr;
}

function epochSecondsToDayStr(epochSeconds: number): string {
    return moment.unix(epochSeconds).format('YYYY-MM-DDTHH:mm:ss');
}

function formatTimeFromEpoch(epochSeconds: number) {
    const date = new Date(epochSeconds * 1000);

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
}

function formatDayFromEpoch(epochSeconds: number) {
    const date = new Date(epochSeconds * 1000);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
}

// 7200s => 2h 0m
function secondsToHoursMinutes(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
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
    formatDayFromEpoch,
    epochSecondsToDayStr,
    convertToEpochSeconds,
    formatTimeFromEpoch,
};
