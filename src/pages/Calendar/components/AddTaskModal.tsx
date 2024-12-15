import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";

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
            className="bg-white border-2 p-3 border-border-secondary rounded-md"
            style={{
                position: "absolute",
                top: modalPosition.top + 10,
                left: modalPosition.left + 10,
                zIndex: 9999,
            }}
        >
            <Box sx={{ maxWidth: 200 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                    Form Modal
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
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
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel id="priority-label">Priority</InputLabel>
                        <Select
                            labelId="priority-label"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                        >
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
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
                            Submit
                        </Button>
                    </Box>
                </form>
            </Box>
        </div>
    );
};

export default AddTaskModal;
