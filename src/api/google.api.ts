import axios from "axios";

const BASE_CALENDAR_URL = "https://www.googleapis.com/calendar/v3/calendars";
const BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY =
    "holiday@group.v.calendar.google.com"; // Calendar Id. This is public but apparently not documented anywhere officialy.

const API_KEY = (import.meta as any).env.VITE_API_KEY;
const CALENDAR_REGION = "en.vietnamese";

const fetchHolidays = async ({
    startDate,
    endDate,
}: {
    startDate: string;
    endDate: string;
}) => {
    try {
        const startDateISO = new Date(startDate).toISOString();
        const endDateISO = new Date(endDate).toISOString();

        const url = `${BASE_CALENDAR_URL}/${CALENDAR_REGION}%23${BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY}/events?key=${API_KEY}`;
        const response = await axios.get(url, {
            params: {
                timeMin: startDateISO,
                timeMax: endDateISO,
                singleEvents: true,
                orderBy: "startTime",
            },
        });

        const holidayEvents = response.data.items.map((event: any) => ({
            id: event.id,
            name: event.summary,
            isHoliday: true,
            start: event.start.date || event.start.dateTime,
            end: event.end.date || event.end.dateTime,
            color: "#FFF0F0", // You can style holiday events differently
            editable: false,
        }));

        console.log(holidayEvents);
        return holidayEvents;
    } catch (error) {
        console.error("Error fetching holidays:", error);
    }
};

export { fetchHolidays };
