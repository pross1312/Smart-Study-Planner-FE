import TaskList from "./Task";
import ChatBox from "../component/ChatBox";

export default function () {
    return (
        <div style={{ display: "flex" }}>
            <TaskList />
            <ChatBox />
        </div>
    );
}
