import React, { useEffect, useState } from "react";

interface CustomHeaderProps {
    calendarRef: React.RefObject<any>;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ calendarRef }) => {
    const [currentMonth, setCurrentMonth] = useState("");
    const [totalDayInMonth, setTotalDayInMonth] = useState("");
    const [currentYear, setCurrentYear] = useState("");
    const [startMonth, setStartMonth] = useState("");
    const [endMonth, setEndMonth] = useState("");
    const [totalTasks, setTotalTasks] = useState(0);

    const updateHeaderData = (): void => {
        const calApi = calendarRef.current?.getApi();
        if (calApi) {
            const view = calApi.view;
            const currentDate = view.currentStart;
            const startDate = view.activeStart;
            const endDate = view.activeEnd;

            // Format the dates
            const options = {
                month: "short",
                day: "numeric",
                year: "numeric",
            } as const;
            setCurrentMonth(
                currentDate.toLocaleString("default", { month: "long" })
            );
            setTotalDayInMonth(view.currentEnd.getDate().toString());
            setCurrentYear(currentDate.getFullYear().toString());
            setStartMonth(startDate.toLocaleDateString("en-US", options));
            setEndMonth(endDate.toLocaleDateString("en-US", options));

            // Example: Get total tasks (adjust based on your events)
            const events = calApi.getEvents();
            setTotalTasks(events.length);
        }
    };

    const handleDateChange = (direction: "prev" | "today" | "next"): void => {
        const calApi = calendarRef.current?.getApi();
        if (calApi) {
            if (direction === "prev") {
                calApi.prev();
            } else if (direction === "next") {
                calApi.next();
            } else {
                calApi.today();
            }
            updateHeaderData(); // Update header data after date change
        }
    };

    useEffect(() => {
        updateHeaderData();
    }, []);

    return (
        <div className="flex justify-between items-center p-3 mb-5">
            <div className="flex">
                <div className="border rounded-md border-gray-200">
                    <p className="bg-gray-100 px-5 py-2 text-center font-bold text-lg text-gray-500">
                        {currentMonth.substring(0, 3).toUpperCase()}
                    </p>
                    <p className="px-5 text-center text-purple-600 font-bold text-lg">
                        {totalDayInMonth.toString()}
                    </p>
                </div>
                <div className="ml-3">
                    <div>
                        <p className="text-lg font-bold inline-block">
                            {currentMonth + " " + currentYear}
                        </p>
                        <p className="inline ml-2 border-gray-300 border-2 py-1 rounded-md px-2 text-sm text-gray-500">
                            {totalTasks + " tasks"}
                        </p>
                    </div>
                    <p className="mt-3 font-normal text-gray-500 text-md">
                        {startMonth + " - " + endMonth}
                    </p>
                </div>
            </div>
            <div className="border">
                <button
                    className="py-[10px] px-4"
                    onClick={(): void => handleDateChange("prev")}
                >
                    Previous
                </button>
                <button
                    className="p-4 border-l border-r text-zinc-800 font-semibold"
                    onClick={(): void => handleDateChange("today")}
                >
                    This month
                </button>
                <button
                    className="py-[10px] px-4"
                    onClick={(): void => handleDateChange("next")}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CustomHeader;
