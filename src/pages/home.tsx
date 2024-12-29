import ChatBox from "../component/ChatBox";
import Dashboard from "../component/DashBoard";

export default function () {
    return (
        <div style={{ display: "flex" }}>
            <Dashboard />
            <ChatBox />
        </div>
    );
}
