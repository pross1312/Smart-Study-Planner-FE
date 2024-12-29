import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"; // needed for dayClick
import { createRef, useEffect, useRef, useState } from "react";
import EventContent from "./EventContent";
import {
    epochMillsToDayStr,
    secondsToHoursMinutes,
} from "../../../utils/DateTImeUtils";
import { createTodo, getTodos } from "../../../api/todo.api";
import { Task, TaskStatus, Todo } from "../../../api/Response";
import { getTasks } from "../../../api/task.api";
import moment from "moment";

export function CustomCalendar() {
    const calendarRef = createRef<FullCalendar>();

    const [todos, setTodos] = useState([]);
    const [tasks, setTasks] = useState([] as Task[]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const taskContainerRef = useRef(null);

    // Get todos = calendar event
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await getTodos({ startDate, endDate });
                const transformedTodos = response.data.data.map(
                    (todo: Todo) => ({
                        id: todo.task.id.toString(),
                        name: todo.task.name,
                        estimatedTime: todo.task.estimate_time,
                        priority: todo.task.priority,
                        start: epochMillsToDayStr(todo.start_date),
                    })
                );
                console.log(transformedTodos);

                setTodos(transformedTodos);
            } catch (error) {
                console.error("Failed to fetch todos:", error);
            }
        };

        fetchTodos();
    }, []);

    // Get tasks that have todo status
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await getTasks({ status: TaskStatus.ToDo });
                setTasks(response.data.data.tasks);
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
    const handleAddTodo = async (info: any) => {
        const startDate = moment(info.event.start).format("YYYY-MM-DD");
        console.log(123);
        try {
            await createTodo({
                taskId: info.event.id,
                startDate,
            });
            info.draggedEl.parentNode.removeChild(info.draggedEl);
        } catch (error) {
            console.error("Failed to create todo:", error);
        }
    };

    // TODO: Update event's date
    // handle change event date
    const handleEventDrop = (info: any) => {
        const { event } = info;

        try {
            // Update state
            console.log(event);
        } catch (error) {
            console.error("Error while dropping event:", error);
            info.revert(); // Revert changes on error
        }
    };

    return (
        <div className="flex text-sm p-3  gap-5 h-full max-h-full ">
            <div className="flex-grow mx-auto">
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                    events={todos}
                    editable={true}
                    selectable={true}
                    eventContent={(eventInfo) => (
                        <EventContent
                            title={eventInfo.event.extendedProps.name}
                            timeText={secondsToHoursMinutes(
                                eventInfo.event.extendedProps.estimatedTime
                            )}
                            priority={eventInfo.event.extendedProps.priority}
                        />
                    )}
                    eventReceive={(info) => {
                        handleAddTodo(info);
                    }}
                    eventDrop={(info) => {
                        handleEventDrop(info);
                    }}
                    droppable={true}
                    fixedWeekCount={false}
                    dayMaxEventRows={3}
                    datesSet={handleDatesSet}
                />
            </div>

            <div
                className="border border-l-2 p-2 flex flex-col"
                ref={taskContainerRef}
            >
                {tasks.map((task, index) => (
                    <div
                        key={index}
                        className="draggable-task p-2 rounded cursor-pointer"
                        data-name={task.name}
                        data-estimated-time={task.estimate_time}
                        data-priority={task.priority}
                        data-id={task.id}
                    >
                        <EventContent
                            title={task.name}
                            timeText={secondsToHoursMinutes(task.estimate_time)}
                            priority={task.priority}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
