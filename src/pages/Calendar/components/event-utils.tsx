import { TaskPriority } from "../../../api/Response";

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today


export const INITIAL_EVENTS = [
    {
        id: createEventId(),
        title: "All-day event",
        start: todayStr,
        priority: TaskPriority.High,
    },
    {
        id: createEventId(),
        title: "Timed event",
        start: todayStr + "T12:00:00",
        priority: TaskPriority.Low, 
    },
    {
        id: createEventId(),
        title: "Break with team",
        start: todayStr + "T12:00:00",
        priority: TaskPriority.Medium,
    },
];

export function createEventId() {
    return String(eventGuid++);
}
