import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import { useAuth } from "../store/AuthContext";
import { deleteTaskFetch, updateTaskFetch } from "../api/task";
import "./css/CreateTask.css";
import "react-datepicker/dist/react-datepicker.css";
import { Task, TaskStatus } from "../api/Response";
import { ToastContainer, toast } from 'react-toastify';

interface UpdateTaskModalProps {
    task: Task;
    onUpdate: (updatedTask: Task) => void;
    onDelete: (taskId: number) => void;
}

const UpdateTaskModal: React.FC<UpdateTaskModalProps> = ({ task, onUpdate, onDelete }) => {
    const auth = useAuth();
    const [show, setShow] = useState<boolean>(false);
    const [updatedTask, setUpdatedTask] = useState<Task>(task);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setUpdatedTask((prev) => ({ ...prev, [name]: value }));
    };

    const handleStatusChange = (status: TaskStatus) => {
        setUpdatedTask((prev) => ({ ...prev, status }));
    };

    const handleSubmit = async () => {
        if (!updatedTask.name || !updatedTask.status) {
            toast.error("Task Name and Status are required!");
            return;
        }
        onUpdate(updatedTask);
        const response = await updateTaskFetch(updatedTask, auth.getAccessToken() || "[]", updatedTask.id);
        if (response?.success === true) {
            toast.success("Update successful");
        } else {
            toast.error(response?.data);
        }
        handleClose();
    };

    const handleDelete = async () => {
        const userConfirmed = window.confirm("Do you want to delete this task?");
        if (!userConfirmed) {
            return;
        }

        const response = await deleteTaskFetch(auth.getAccessToken() || "[]", task.id);
        if (response?.success === true) {
            toast.success("Delete successful");
        } else {
            toast.error(response?.data);
        }
        onDelete(task.id);
        handleClose();
    };

    return (
        <>
            <div style={{ display: "inline-flex", alignItems: "center", width: '5%' }}>
                <div
                    onClick={handleShow}
                    style={{
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "38px",
                        borderRadius: "5px",
                        color: "black",
                        cursor: "pointer",
                        transition: "transform 0.2s",
                        marginLeft: "10px",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                    <FontAwesomeIcon size="xl" icon={faEdit} style={{ color: '#1c5500' }} />
                </div>

                {/* Delete Task Icon */}
                <div
                    onClick={handleDelete}
                    style={{
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "38px",
                        borderRadius: "5px",
                        color: "black",
                        cursor: "pointer",
                        transition: "transform 0.2s",
                        marginLeft: "10px",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                    <FontAwesomeIcon size="xl" icon={faTrash} style={{ color: 'rgb(180 35 24)' }} />
                </div>
            </div>

            {/* Modal */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="taskName">
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter task name"
                                name="name"
                                value={updatedTask.name}
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
                                value={updatedTask.description}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="taskStatus">
                            <Form.Label>Status</Form.Label>
                            <div className="status-options">
                                {[TaskStatus.InProgress, TaskStatus.ToDo, TaskStatus.Done].map((status) => (
                                    <div
                                        key={status}
                                        className={`status-box ${
                                            updatedTask.status === status ? "active" : ""
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
                                                updatedTask.status === status ? "#007bff" : "white",
                                            color: updatedTask.status === status ? "white" : "black",
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
                                value={updatedTask.priority}
                                onChange={handleChange}
                            >
                                <option value="HIGH">High</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="LOW">Low</option>
                            </Form.Select>
                        </Form.Group>

                        {/* Start Time */}
                        <Form.Group className="mb-3 d-flex flex-column" controlId="taskStartTime">
                            <Form.Label>Start Time</Form.Label>
                            <DatePicker
                                selected={updatedTask.start_time ? new Date(updatedTask.start_time * 1000) : null}
                                onChange={(date) =>
                                    setUpdatedTask((prev) => ({
                                        ...prev,
                                        start_time: date ? Math.floor(date.getTime() / 1000) : null, // Save as a Unix timestamp
                                    }))
                                }
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="yyyy-MM-dd HH:mm"
                                placeholderText="Select start time"
                                className="form-control"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex flex-column" controlId="taskEndTime">
                            <Form.Label>End Time</Form.Label>
                            <DatePicker
                                selected={updatedTask.end_time ? new Date(updatedTask.end_time * 1000) : null}
                                onChange={(date) =>
                                    setUpdatedTask((prev) => ({
                                        ...prev,
                                        end_time: date ? Math.floor(date.getTime() / 1000) : null, // Save as Unix timestamp
                                    }))
                                }
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="yyyy-MM-dd HH:mm"
                                placeholderText="Select end time"
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
                        Update Task
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UpdateTaskModal;
