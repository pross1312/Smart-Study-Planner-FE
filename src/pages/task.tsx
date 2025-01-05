import { useState, useEffect } from "react";
import { ListGroup, Button, Form } from "react-bootstrap";
import "./css/task.css";
import { listTaskFetch } from "../api/task";
import { useAuth } from "../store/AuthContext";
import CreateTaskModal from "../component/CreateTask";
import UpdateTaskModal from "../component/UpdateTask";
import { Task, TaskPriority, TaskStatus } from "../api/Response";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function formatStatus(status: TaskStatus | TaskPriority) {
    return status
        .toLowerCase()
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function formatDate(timestamp: number) {
    const date = new Date(timestamp * 1000);
    if (isNaN(date.getTime())) {
        return '';
    }
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    const suffix = getDaySuffix(day);
    return `${hours}:${minutes} ${month} ${day}${suffix} ${year}`;
}

function getDaySuffix(day: any) {
    if (day >= 11 && day <= 13) {
        return "th";
    }
    switch (day % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}

const TaskList = () => {
    const auth = useAuth();
    const [tasks, setTasks] = useState([] as Task[]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage, setTasksPerPage] = useState(7);
    const [totalPages, setTotalPages] = useState(1);
    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("");

    useEffect(() => {
        if (statusFilter || priorityFilter) {
            setTasksPerPage(7);
            setCurrentPage(1);
        }
    }, [statusFilter, priorityFilter]);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await listTaskFetch(
                currentPage,
                tasksPerPage,
                statusFilter,
                priorityFilter,
                auth.getAccessToken() || "",
                searchQuery,
                sortBy
            );
            const listTask = response?.data.tasks;
            setTasks(listTask);
            setTotalPages(Math.ceil(response?.data.total.count / tasksPerPage));
            setLoading(false);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchTasks();
        setLoading(false);
    }, [currentPage, tasksPerPage, statusFilter, priorityFilter, sortBy]);

    const handleSearch = () => {
        setCurrentPage(1);
        fetchTasks();
    };

    const handleSearchKeyPress = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    const addTaskToList = () => {
        setLoading(true);
        fetchTasks();
        setLoading(false);
    };

    const handleUpdateTask = (updatedTask: Task) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
            )
        );
    };

    const handleDeleteTask = (taskId: number) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        setLoading(true);
        fetchTasks();
        setLoading(false);
    };

    return (
        <div
            className="container fix-scroll m-0 d-flex"
            style={{
                padding: "0px 0px 0 41px ",
                height: "92%",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <div>
                <div className="header-title">Task List 🔥</div>
                <div className="header-container">
                    <div className="search-box d-flex align-items-center">
                        <input
                            style={{
                                fontSize: "14px",
                                height: "38px",
                                margin: "0",
                            }}
                            type="text"
                            placeholder="Search..."
                            className="form-control"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleSearchKeyPress}
                        />
                        <button
                            className="btn btn-outline-secondary ml-2"
                            onClick={handleSearch}
                        >
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                    <div className="filters">
                        <Form.Group
                            className="form-group"
                            controlId="statusFilter"
                        >
                            <Form.Control
                                as="select"
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value);
                                    setCurrentPage(1);
                                }}
                                style={{ width: "88px", fontSize: "14px" }}
                            >
                                <option value="" disabled hidden>
                                    Status ↓
                                </option>
                                <option value="">All</option>
                                <option value="IN_PROGRESS">In progress</option>
                                <option value="DONE">Done</option>
                                <option value="TODO">Todo</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group
                            className="form-group"
                            controlId="priorityFilter"
                        >
                            <Form.Control
                                as="select"
                                value={priorityFilter}
                                onChange={(e) => {
                                    setPriorityFilter(e.target.value);
                                    setCurrentPage(1);
                                }}
                                style={{ fontSize: "14px" }}
                            >
                                <option value="" disabled hidden>
                                    Priority ↓
                                </option>
                                <option value="">All</option>
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group
                            className="form-group"
                            controlId="sortByFilter"
                        >
                            <Form.Control
                                as="select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                style={{ fontSize: "14px" }}
                            >
                                <option value="" disabled hidden>
                                    Sort By ↓
                                </option>
                                <option value="">All</option>
                                <option value="name">Name</option>
                                <option value="start_time">Start Time</option>
                                <option value="end_time">End Time</option>
                            </Form.Control>
                        </Form.Group>
                        <CreateTaskModal
                            className="create-task-modal"
                            addTaskToList={addTaskToList}
                        />
                    </div>
                </div>

                {loading ? (
                    <p>Loading tasks...</p>
                ) : (
                    <ListGroup className="group-task">
                        <div
                            style={{
                                height: "42px",
                                fontSize: "12px",
                                backgroundColor: "#f2f4f7",
                            }}
                            className="task-details"
                        >
                            <div className="task-field task-name hover-detail">
                                Name
                            </div>
                            <div className="task-field task-status hover-detail">
                                Status
                            </div>
                            <div className="task-field task-status hover-detail">
                                Priority
                            </div>
                            <div className="task-field task-estimate-time hover-detail">
                                Start Time
                            </div>
                            <div className="task-field task-estimate-time hover-detail">
                                End Time
                            </div>
                            <div className="task-field task-description hover-detail">
                                Description
                            </div>
                            <div></div>
                        </div>
                        {tasks?.map((task) => (
                            <div className="task-details" key={task.id}>
                                <div
                                    className="task-field task-name hover-detail"
                                    style={{ fontWeight: "600" }}
                                >
                                    {task.name}
                                    <span className="tooltip">{task.name}</span>
                                </div>

                                <div className="task-field task-status hover-detail">
                                    {formatStatus(task.status)}
                                    <span className="tooltip">
                                        {formatStatus(task.status)}
                                    </span>
                                </div>

                                <div className="task-field task-status hover-detail">
                                    <div
                                        className={`priority-${task.priority?.toLowerCase()} task-field-fix`}
                                    >
                                        {formatStatus(task.priority)}
                                    </div>
                                </div>

                                <div
                                    className="task-field task-estimate-time hover-detail"
                                    style={{ fontSize: "14px" }}
                                >
                                    {task.start_time &&
                                        formatDate(task.start_time)}
                                </div>

                                <div
                                    className="task-field task-estimate-time hover-detail"
                                    style={{ fontSize: "14px" }}
                                >
                                    {task.end_time && formatDate(task.end_time)}
                                </div>

                                <div className="task-field task-description hover-detail">
                                    {task.description}
                                    <span className="tooltip">
                                        {task.description}
                                    </span>
                                </div>

                                <UpdateTaskModal
                                    key={task.id}
                                    task={task}
                                    onUpdate={handleUpdateTask}
                                    onDelete={handleDeleteTask}
                                />
                            </div>
                        ))}
                    </ListGroup>
                )}
            </div>
            <div className="mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <Button
                        key={index + 1}
                        variant="secondary"
                        onClick={() => setCurrentPage(index + 1)}
                        style={{ margin: "3px" }}
                    >
                        {index + 1}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default TaskList;
