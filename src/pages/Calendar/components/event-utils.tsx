let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export enum EventTag {
    NEW = "new",
    MEDIUM = "MEDIUM",
    BREAK = "break",
}

export const INITIAL_EVENTS = [
    {
        id: createEventId(),
        title: "All-day event",
        start: todayStr,
        tag: EventTag.MEDIUM,
    },
    {
        id: createEventId(),
        title: "Timed event",
        start: todayStr + "T12:00:00",
        tag: EventTag.NEW,
    },
    {
        id: createEventId(),
        title: "Break with team",
        start: todayStr + "T12:00:00",
        tag: EventTag.BREAK,
    },
];

export function createEventId() {
    return String(eventGuid++);
}
