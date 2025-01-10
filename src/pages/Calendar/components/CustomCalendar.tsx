import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"; // needed for dayClick
import { createRef, useEffect, useRef, useState } from "react";
import EventContent from "./EventContent";
import {
    secondsToHoursMinutes,
    epochSecondsToDayStr,
} from "../../../utils/DateTImeUtils";
import { getTodos } from "../../../api/todo.api";
import { Task } from "../../../api/Response";
import { getUnAssignedTasks, updateTasks } from "../../../api/task.api";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { EventInput } from "@fullcalendar/core/index.js";
import { Tooltip } from "@mui/material";
import { fetchHolidays } from "../../../api/google.api";

export function CustomCalendar() {
    const calendarRef = createRef<FullCalendar>();

    const [todos, setTodos] = useState([] as Task[]);
    const [tasks, setTasks] = useState([] as Task[]);
    const [events, setEvents] = useState([] as EventInput[]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const navigate = useNavigate();

    const taskContainerRef = useRef(null);
    const getCurrentMonthDates = () => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            const startDate = moment(calendarApi.view.currentStart).format(
                "YYYY-MM-DD"
            );
            const endDate = moment(calendarApi.view.currentEnd)
                .add(1, "days")
                .format("YYYY-MM-DD");
            setStartDate(startDate);
            setEndDate(endDate);
        }
    };

    useEffect(() => {
        getCurrentMonthDates();
    }, [calendarRef]);

    // Get todos = calendar event
    useEffect(() => {
        const fetchTodos = async () => {
            console.log("fetching todos");
            try {
                if (startDate === "" || endDate === "") return;

                const startEpoch = Math.floor(
                    new Date(startDate).getTime() / 1000
                );
                const endEpoch = Math.floor(new Date(endDate).getTime() / 1000);

                const response = await getTodos({
                    startDate: startEpoch + "",
                    endDate: endEpoch + "",
                });

                const transformedTodos = response.data.data.tasks
                    .filter(
                        (
                            task: Task
                        ): task is Task & {
                            start_time: number;
                            end_time: number;
                        } => task.start_time !== null && task.end_time !== null
                    )
                    .map((task: any) => ({
                        id: task.id.toString(),
                        name: task.name,
                        estimatedTime: task.end_time - task.start_time,
                        priority: task.priority,
                        start: epochSecondsToDayStr(task.start_time),
                        end: epochSecondsToDayStr(task.end_time),
                        start_time: task.start_time,
                        end_time: task.end_time,
                    }));
                const ggResponse = await fetchHolidays({ startDate, endDate });
                setEvents([...transformedTodos, ...ggResponse]);
                setTodos(transformedTodos);

                console.log(transformedTodos);
            } catch (error) {
                console.error("Failed to fetch todos:", error);
            }
        };

        fetchTodos();
    }, [startDate, endDate]);

    // Get tasks that have todo status
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await getUnAssignedTasks();
                setTasks(response.data.data);
            } catch (error) {
                console.error("Failed to fetch todos:", error);
            }
        };

        fetchTodos();
    }, []);

    // build draggable tasks
    useEffect(() => {
        if (!taskContainerRef.current) return;
        new Draggable(taskContainerRef.current, {
            itemSelector: ".draggable-task",
            eventData: function (eventEl) {
                const id = eventEl.getAttribute("data-id");
                const name = eventEl.getAttribute("data-name");
                const priority = eventEl.getAttribute("data-priority");
                const estimatedTime = eventEl.getAttribute(
                    "data-estimated-time"
                );
                return {
                    id,
                    name,
                    priority,
                    estimatedTime,
                };
            },
        });
    }, []);

    const handleDatesSet = (arg: any) => {
        setStartDate(arg.startStr);
        setEndDate(arg.endStr);
    };

    // Change task to todo when drop into calendar
    const handleAddTimeForTask = async (info: any) => {
        const startDate = moment(info.event.start).format("YYYY-MM-DD");
        try {
            await updateTasks(
                info.event.id,
                new Date(startDate).getTime() / 1000,
                new Date(startDate).getTime() / 1000
            );

            info.draggedEl.parentNode.removeChild(info.draggedEl);
        } catch (error) {
            console.error("Failed to create todo:", error);
        }
    };

    // handle change event date
    const handleEventDrop = async (info: any) => {
        const { event } = info;

        try {
            const task = todos.find((t) => t.id === event.id);
            if (!task) return;

            await updateTasks(
                info.event.id,
                new Date(event.start).getTime() / 1000,
                new Date(event.end).getTime() / 1000
            );
        } catch (error) {
            console.error("Error while dropping event:", error);
            info.revert(); // Revert changes on error
        }
    };

    const handleEventResize = async (info: any) => {
        const { event } = info;

        try {
            const newStart = event.start;
            const newEnd = event.end;

            await updateTasks(
                info.event.id,
                newStart.getTime() / 1000,
                newEnd.getTime() / 1000
            );
        } catch (error) {
            console.error("Resize failed:", error);
            info.revert();
        }
    };

    const handleTaskClick = (eventInfo: any) => {
        navigate(`/pomodoro/?taskId=${eventInfo.event.id}`);
    };

    return (
        <div className="flex text-sm p-3 gap-5 h-full max-h-full ">
            <div className="flex-grow mx-auto">
                <FullCalendar
                    timeZone="local"
                    ref={calendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                    events={events}
                    editable={true}
                    eventResizableFromStart={true}
                    selectable={true}
                    eventContent={(eventInfo) =>
                        eventInfo.event.extendedProps.isHoliday ? (
                            <Tooltip
                                enterDelay={1000}
                                title={eventInfo.event.extendedProps.name}
                            >
                                <div className="w-full max-w-full overflow-hidden whitespace-nowrap text-ellipsis">
                                    <b className="text-ellipsis text-[#CE0707] font-medium text-xs rounded border border-[#FFC3C3] border-solid bg-[#FFF0F0] px-[6px] py-[3px]">
                                        {eventInfo.event.extendedProps.name}
                                    </b>
                                </div>
                            </Tooltip>
                        ) : (
                            <Tooltip
                                enterDelay={1000}
                                title={
                                    eventInfo.event.extendedProps.name +
                                    " " +
                                    secondsToHoursMinutes(
                                        eventInfo.event.extendedProps
                                            .estimatedTime
                                    )
                                }
                            >
                                <div
                                    onClick={() => handleTaskClick(eventInfo)}
                                    className="w-full max-w-full overflow-hidden whitespace-nowrap text-ellipsis"
                                >
                                    <b className="text-ellipsis">
                                        {eventInfo.event.extendedProps.name}
                                    </b>
                                    <i className="text-ellipsis">
                                        {secondsToHoursMinutes(
                                            eventInfo.event.extendedProps
                                                .estimatedTime
                                        )}
                                    </i>
                                </div>
                            </Tooltip>
                        )
                    }
                    eventReceive={(info) => {
                        handleAddTimeForTask(info);
                    }}
                    eventDrop={(info) => {
                        handleEventDrop(info);
                    }}
                    droppable={true}
                    fixedWeekCount={false}
                    datesSet={handleDatesSet}
                    eventResize={(info) => handleEventResize(info)}
                />
            </div>

            <div
                className="border border-l-2 p-2 flex flex-col min-w-[200px] h-full"
                ref={taskContainerRef}
            >
                {tasks?.map((task, index) => (
                    <div
                        key={index}
                        className="draggable-task p-2 rounded cursor-pointer"
                        data-name={task.name}
                        data-estimated-time={
                            (task?.start_time || 0) - (task?.end_time || 0)
                        }
                        data-priority={task.priority}
                        data-id={task.id}
                    >
                        <EventContent
                            title={task.name}
                            priority={task.priority}
                            timeText="" // because it's not to set
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CustomCalendar;
