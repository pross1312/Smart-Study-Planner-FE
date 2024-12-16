import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getTasks } from "../../../api/task.api";
import { TaskStatus } from "../../../api/Response";

interface AddTaskModalProps {
    onClose: (open: boolean) => void;
    selectedInfo: any;
    modalPosition: { top: number; left: number }; // Pass modal position as prop
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
    onClose,
    selectedInfo,
    modalPosition,
}) => {
    const [formData, setFormData] = useState({
        title: "",
        time: "",
        priority: "",
        description: "",
    });

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await getTasks({ status: TaskStatus.Done });
                console.log(res.data.data.tasks);
                setTasks(res.data.data.tasks);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    const handleClose = () => {
        onClose(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        handleClose(); // Close modal after submission
    };

    return (
        <div
            className="bg-white border-2 p-3 
            min-w-[300px] border-border-secondary rounded-md flex justify-center items-center"
            style={{
                position: "absolute",
                top: modalPosition.top,
                left: modalPosition.left,
                zIndex: 10,
            }}
        >
            <Box sx={{ maxWidth: 380 }}>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel id="priority-label">Task</InputLabel>
                        <Select
                            labelId="priority-label"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                        >
                            {tasks.map((task) => (
                                <MenuItem key={task.id} value={task.id}>
                                    {task.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="Time"
                        name="time"
                        type="datetime-local"
                        value={formData.time}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                    />

                    <TextField
                        label="Time"
                        name="time"
                        type="datetime-local"
                        value={formData.time}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                    />
                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Add
                        </Button>
                    </Box>
                </form>
            </Box>
        </div>
    );
};

export default AddTaskModal;
