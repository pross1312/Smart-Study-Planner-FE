import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"; // needed for dayClick
import { createRef, useEffect, useRef, useState } from "react";
import AddTaskModal from "./AddTaskModal";
import CustomHeader from "./CustomHeader";
import EventContent from "./EventContent";
import {
    epochMillsToDayStr,
    minutesToHoursMinutes,
} from "../../../utils/DateTImeUtils";
import { createTodo, getTodos } from "../../../api/todo.api";
import { Task, TaskStatus, Todo } from "../../../api/Response";
import { getTasks } from "../../../api/task.api";
import moment from "moment";

export function CustomCalendar() {
    const [isOpenAddTaskModal, setIsOpenAddTaskModal] = useState(false);
    const [modalPosition, setModalPosition] = useState<{
        top: number;
        left: number;
    }>({ top: 0, left: 0 });

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
                const transformedTodos = response.data.data.map((todo : Todo) => ({
                    id: todo.id.toString(),
                    name: todo.task.name,
                    estimatedTime: todo.task.estimate_time,
                    priority: todo.task.priority,
                    start: epochMillsToDayStr(todo.start_date),
                }));
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
        if(!taskContainerRef.current) return;
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

    function handleDateClick(selectInfo: any) {
        const clickedDate = selectInfo.dateStr; // Get the clicked date in string format (e.g., "2024-12-15")
        const cellElement = document.querySelector(
            `[data-date="${clickedDate}"]`
        ); // Find the calendar cell element for the date

        if (cellElement) {
            const cellRect = cellElement.getBoundingClientRect(); // Get the bounding box of the calendar cell
            const modalTop = cellRect.top + window.scrollY + 10; // Adjust modal top position relative to the cell
            const modalLeft = cellRect.left + window.scrollX + cellRect.width; // Adjust modal left position relative to the cell

            setModalPosition({
                top: modalTop,
                left: modalLeft,
            });
        } else {
            console.error("Calendar cell not found for the clicked date.");
        }

        setIsOpenAddTaskModal(true);
        // setSelectedInfo(selectInfo);
    }

    const handleDatesSet = (arg : any) => {
        setStartDate(arg.startStr);
        setEndDate(arg.endStr);
    };

    // Change task to todo when drop into calendar
    const handleAddTodo = async (info : any) => {
        const startDate = moment(info.event.start).format("YYYY-MM-DD");

        console.log(startDate);
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

    return (
        <div className="flex text-sm mx-4 gap-5 max-h-[90vh]">
            <div className="flex-grow  mx-auto">
                <CustomHeader calendarRef={calendarRef} />
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={false}
                    events={todos}
                    editable={true}
                    selectable={true}
                    dateClick={handleDateClick}
                    eventContent={(eventInfo) => (
                        <EventContent
                            title={eventInfo.event.extendedProps.name}
                            timeText={minutesToHoursMinutes(
                                eventInfo.event.extendedProps.estimatedTime
                            )}
                            priority={eventInfo.event.extendedProps.priority}
                        />
                    )}
                    eventReceive={(info) => {
                        handleAddTodo(info);
                    }}
                    droppable={true}
                    fixedWeekCount={false}
                    dayMaxEvents={true}
                    dayMaxEventRows={3}
                    datesSet={handleDatesSet}
                />
            </div>

            <div
                className="border border-l-2 p-2 flex flex-col w-[260px]"
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
                            timeText={minutesToHoursMinutes(task.estimate_time)}
                            priority={task.priority}
                        />
                    </div>
                ))}
            </div>

            {isOpenAddTaskModal && (
                <AddTaskModal
                    onClose={setIsOpenAddTaskModal}
                    modalPosition={modalPosition}
                ></AddTaskModal>
            )}
        </div>
    );
}
