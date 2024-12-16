import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import {addTaskFetch} from '../api/task'
import "./css/CreateTask.css";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../component/AuthContext";

interface Task {
    name: string;
    description: string;
    status: string;
    priority: string;
    estimate_time: string;
}

interface CreateTaskModalProps {
    addTaskToList: (newTask: Task) => void;
}

function convertTime(timestamp: string): string {
    const date = new Date(timestamp);

    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    const totalSeconds = (hours * 3600) + (minutes * 60);
    return totalSeconds.toString();
}

const CreateTaskModal: React.FC = ({ addTaskToList }) => {
    const auth = useAuth();
    const [show, setShow] = useState<boolean>(false);
    const [task, setTask] = useState<Task>({
        name: "",
        description: "",
        status: "",
        priority: "Medium",
        estimate_time: "",
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
            alert("Task Name and Status are required!");
            return;
        }
        task.estimate_time = convertTime(task.estimate_time);
        const response = await addTaskFetch(task, auth.getAccessToken());
        alert(response?.data)
        addTaskToList(task);
        handleClose();
    };

    return (
        <>
            {/* Button to trigger modal */}
            <div
                onClick={handleShow}
                style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "38px",
                    height: "38px",
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

                        {/* Description */}
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

                        {/* Status */}
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

                        {/* Priority */}
                        <Form.Group className="mb-3" controlId="taskPriority">
                            <Form.Label>Priority</Form.Label>
                            <Form.Select
                                name="priority"
                                value={task.priority}
                                onChange={handleChange}
                            >
                                <option>HIGH</option>
                                <option>MEDIUM</option>
                                <option>LOW</option>
                            </Form.Select>
                        </Form.Group>

                        {/* Estimate Time */}
                        <Form.Group className="mb-3 d-flex flex-column" controlId="taskEstimate_time">
                            <Form.Label>Estimate Time</Form.Label>
                            <DatePicker
                                selected={task.estimate_time ? new Date(task.estimate_time) : null}
                                onChange={(time) => setTask(prev => ({ ...prev, estimate_time: time?.toISOString() || '' }))}
                                showTimeSelect
                                showTimeSelectOnly
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="HH:mm"
                                placeholderText="Select estimated time"
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
