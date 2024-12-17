import { useState, useEffect } from 'react';
import { Card, ListGroup, Button, Form } from 'react-bootstrap';
import './css/task.css';
import { listTaskFetch } from '../api/task'
import { useAuth } from "../component/AuthContext";
import CreateTaskModal from "../component/CreateTask"
import UpdateTaskModal from "../component/UpdateTask"
import { Task } from '../api/Response';

function formatSecondsToHoursMinutes(seconds: number) {
    const hours = Math.floor(seconds / 3600); // Get the hours
    const minutes = Math.floor((seconds % 3600) / 60); // Get the remaining minutes

    return `${hours} hours ${minutes} minutes`;
}

const TaskList = () => {
    const auth = useAuth();
    const [tasks, setTasks] = useState([] as Task[]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage, setTasksPerPage] = useState(8);
    const [totalPages, setTotalPages] = useState(1);
    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    
    useEffect(() => {
        if (statusFilter || priorityFilter) {
            setTasksPerPage(8);
            setCurrentPage(1);
        }
    }, [statusFilter, priorityFilter]);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await listTaskFetch(currentPage, tasksPerPage, statusFilter, priorityFilter, auth.getAccessToken() || '');
            const listTask = response?.data.tasks;
            setTasks(listTask);
            setTotalPages(Math.ceil(response?.data.total.count/ tasksPerPage))
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setLoading(false);
        }
    };


    useEffect(() => {
        setLoading(true);
        fetchTasks();
        setLoading(false);

    }, [currentPage, tasksPerPage, statusFilter, priorityFilter]);

    const addTaskToList = () => {
        setLoading(true);
        fetchTasks();
        setLoading(false);
    };

    const handleUpdateTask = (updatedTask: Task) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
    };

    const handleDeleteTask = (taskId: number) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        setLoading(true);
        fetchTasks();
        setLoading(false);
    };

    return (
        <div className="container m-0 d-flex" style={{backgroundColor: '#F3F4F8', padding: '24px 41px', height: '92%', flexDirection: 'column', justifyContent: 'space-between'}}>
            <div>
                <div className='d-flex justify-content-between align-items-center'>
                    <h2>🔥 Task List</h2>
                    <div className="filters d-flex">
                        <Form.Group className="d-flex align-items-center justify-content-center" controlId="statusFilter">
                            <div>Status</div>
                            <Form.Control as="select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                                <option value="">All</option>
                                <option value="IN_PROGRESS">In progress</option>
                                <option value="DONE">Done</option>
                                <option value="TODO">Todo</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="d-flex align-items-center justify-content-center" style={{marginLeft: '10px'}} controlId="priorityFilter">
                            <div style={{margin: 0}}>Priority</div>
                            <Form.Control as="select" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
                                <option value="">All</option>
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                            </Form.Control>
                        </Form.Group>
                        <CreateTaskModal addTaskToList={addTaskToList} />
                    </div>
                </div>
                

                {loading ? (
                    <p>Loading tasks...</p>
                ) : (
                    <ListGroup>
                        {tasks?.map(task => (
                            <Card className='mt-3' style={{ display: 'flex'}} key={task.id}>
                                <Card.Body className={`priority-${task.priority?.toLowerCase()}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '5px', height: '60px'}}>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{
                                            fontWeight: 700,
                                            width: '100px',
                                            marginRight: '200px',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>{task.name}</div>
                                        <div style={{ width: '150px', marginRight: '200px' }}>{task.status}</div>
                                        <div>{formatSecondsToHoursMinutes(task.estimate_time)}</div>
                                    </div>
                                    <UpdateTaskModal
                                        key={task.id}
                                        task={task}
                                        onUpdate={handleUpdateTask}
                                        onDelete={handleDeleteTask}
                                    />
                                </Card.Body>
                            </Card>
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
                        style={{margin: '3px'}}
                    >
                        {index + 1}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default TaskList;
