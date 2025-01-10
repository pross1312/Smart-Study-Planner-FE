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
import { CircularProgress } from "@mui/material";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskStatus } from "../api/Response";

interface Task {
    name: string;
    description: string;
    status: string;
    priority: string;
    start_time: string;
    end_time: string;
}


const TaskSchema = z.object({
    name: z.string().min(1, "Task name is required"),
    description: z.string().optional(),
    status: z.string(),
    priority: z.string(),
    start_time: z.string().optional(),
    end_time: z.string().optional(),
})
.refine(
    (data) =>
      !data.start_time || // If start_time is not defined, skip the validation
      (data.end_time && new Date(data.end_time) > new Date(data.start_time)), // Ensure end_time > start_time
    {
      message: "End time must be greater than start time if start time is provided",
      path: ["end_time"], // Point of failure
    }
  );
;

type TaskSchemaType = z.infer<typeof TaskSchema>;

function convertToSeconds(dateString: string): number {
    const date = new Date(dateString);
    return Math.floor(date.getTime() / 1000);
}


interface CreateTaskModalProps {
    addTaskToList: (newTask: Task) => void;
    className?: string;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ addTaskToList, className }) => {
    const auth = useAuth();
    const [show, setShow] = useState<boolean>(false);

    const [isCreating, setIsCreating] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        reset,
        formState: { errors },
      } = useForm<TaskSchemaType>({
        resolver: zodResolver(TaskSchema),
        defaultValues: {
          name: "",
          description: "",
          status: TaskStatus.ToDo,
          priority: "MEDIUM",
          start_time: "",
          end_time: "",
        },
      });


    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const onSubmit = async (data : TaskSchemaType) => {
        if (isCreating) return;
        setIsCreating(true);
        
        const taskReq = {
            ...data,
            description: data.description || "",
            start_time: data.start_time ? convertToSeconds(data.start_time) : null,
            end_time: data.end_time ? convertToSeconds(data.end_time) : null,
        }
        
        const response = await addTaskFetch(taskReq, auth.getAccessToken() || '');
        toast.success(response?.data);
        addTaskToList({
            ...taskReq,
            start_time: taskReq.start_time ? new Date(taskReq.start_time * 1000).toISOString() : "",
            end_time: taskReq.end_time ? new Date(taskReq.end_time * 1000).toISOString() : "",
        });
        if (response?.statusCode == 200) {
            handleClose();
            reset();
        }
        
        setIsCreating(false);
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
                className={className}
            >
                <FontAwesomeIcon size="xl" icon={faPlus} />
            </div>

            {/* Modal */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        {/* Task Name */}
                        <Form.Group className="mb-3" controlId="taskName">
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter task name"
                                {...register("name")}
                                isInvalid={!!errors.name}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="taskDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter task description"
                                {...register("description")}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="taskStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Select {...register("status")} isInvalid={!!errors.status}>
                                <option value={TaskStatus.ToDo}>TODO</option>
                                <option value={TaskStatus.InProgress}>IN_PROGRESS</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.status?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="taskPriority">
                            <Form.Label>Priority</Form.Label>
                            <Form.Select
                                {...register("priority")} isInvalid={!!errors.priority}
                            >
                                <option value="HIGH">High</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="LOW">Low</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex flex-column" controlId="taskStart_time">
                            <Form.Label>Start Time</Form.Label>
                            <DatePicker
                                selected={watch("start_time") ? new Date(watch("start_time") || "")  : null}
                                onChange={(date) => setValue("start_time", date?.toISOString() || "")}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="yyyy-MM-dd HH:mm"
                                placeholderText="Select start date"
                                className="form-control"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex flex-column" controlId="taskEnd_time">
                            <Form.Label >End Time</Form.Label>
                            <Controller
                                name="end_time"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                    selected={field.value ? new Date(field.value) : null}
                                    onChange={(date) => field.onChange(date?.toISOString() || "")}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    dateFormat="yyyy-MM-dd HH:mm"
                                    placeholderText="Select end date"
                                    className={`form-control ${errors.end_time ? "is-invalid" : ""}`}
                                    />
                                )}
                                />
                                <p className="text-red-600 text-sm cursor-default">
                                    {errors.end_time?.message}
                                </p>
                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button 
                                type="submit" variant="primary" disabled={isCreating}>
                                {isCreating ? (
                                <CircularProgress
                                    size={24}
                                    color="inherit"
                                />
                            ) : (
                                "Save task"
                            )}
                            </Button>
                        </Modal.Footer>
                       
                    </Form>
                </Modal.Body>
                
            </Modal>
        </>
    );
};

export default CreateTaskModal;
