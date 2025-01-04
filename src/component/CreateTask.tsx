import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import { addTaskFetch } from '../api/task';
import "./css/CreateTask.css";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../store/AuthContext";
import { toast } from "react-toastify";

interface Task {
    name: string;
    description: string;
    status: string;
    priority: string;
    start_time: string;
    end_time: string;
}

function convertTime(timestamp: string): string {
    const date = new Date(timestamp);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const totalSeconds = (hours * 3600) + (minutes * 60);
    return totalSeconds.toString();
}

function convertToSeconds(dateString: string): number {
    const date = new Date(dateString);
    return Math.floor(date.getTime() / 1000);
}


interface CreateTaskModalProps {
    addTaskToList: (newTask: Task) => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ addTaskToList }) => {
    const auth = useAuth();
    const [show, setShow] = useState<boolean>(false);
    const [task, setTask] = useState<Task>({
        name: "",
        description: "",
        status: "",
        priority: "Medium",
        start_time: "",
        end_time: "",
    });

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setTask((prev) => ({ ...prev, [name]: value }));
    };

    const handleStatusChange = (status: string) => {
        setTask((prev) => ({ ...prev, status }));
    };

    const handleSubmit = async () => {
        if (!task.name || !task.status) {
            toast.error("Task Name, Status, Start Time, and End Time are required!");
            return;
        }
        
        const taskReq = {
            name: task.name,
            description: task.description,
            status: task.status,
            priority: task.priority,
            start_time: convertToSeconds(task.start_time),
            end_time: convertToSeconds(task.end_time)
        }
        
        const response = await addTaskFetch(taskReq, auth.getAccessToken() || '');
        toast.success(response?.data);
        addTaskToList(task);
        if (response?.statusCode == 200) handleClose();
    };

    return (
        <>
            <div
                onClick={handleShow}
                style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "35px",
                    height: "35px",
                    backgroundColor: "#5051F9",
                    borderRadius: "5px",
                    color: "white",
                    cursor: "pointer",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.2s",
                    marginLeft: "10px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
                <FontAwesomeIcon size="xl" icon={faPlus} />
            </div>

            {/* Modal */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* Task Name */}
                        <Form.Group className="mb-3" controlId="taskName">
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter task name"
                                name="name"
                                value={task.name}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="taskDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter task description"
                                name="description"
                                value={task.description}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="taskStatus">
                            <Form.Label>Status</Form.Label>
                            <div className="status-options">
                                {["TODO", "IN_PROGRESS", "DONE"].map((status) => (
                                    <div
                                        key={status}
                                        className={`status-box ${
                                            task.status === status ? "active" : ""
                                        }`}
                                        onClick={() => handleStatusChange(status)}
                                        style={{
                                            padding: "10px 15px",
                                            border: "1px solid #ccc",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                            textAlign: "center",
                                            marginRight: "10px",
                                            backgroundColor:
                                                task.status === status ? "#007bff" : "white",
                                            color: task.status === status ? "white" : "black",
                                            transition: "background-color 0.3s",
                                        }}
                                    >
                                        {status}
                                    </div>
                                ))}
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="taskPriority">
                            <Form.Label>Priority</Form.Label>
                            <Form.Select
                                name="priority"
                                value={task.priority}
                                onChange={handleChange}
                            >
                                <option value="HIGH">High</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="LOW">Low</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex flex-column" controlId="taskStart_time">
                            <Form.Label>Start Time</Form.Label>
                            <DatePicker
                                selected={task.start_time ? new Date(task.start_time) : null}
                                onChange={(time) => setTask(prev => ({ ...prev, start_time: time?.toISOString() || '' }))}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="yyyy-MM-dd HH:mm"
                                placeholderText="Select start date"
                                className="form-control"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex flex-column" controlId="taskEnd_time">
                            <Form.Label>End Time</Form.Label>
                            <DatePicker
                                selected={task.end_time ? new Date(task.end_time) : null}
                                onChange={(time) => setTask(prev => ({ ...prev, end_time: time?.toISOString() || '' }))}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="yyyy-MM-dd HH:mm"
                                placeholderText="Select end date"
                                className="form-control"
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Task
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CreateTaskModal;
