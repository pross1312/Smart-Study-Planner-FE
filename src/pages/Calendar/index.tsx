import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CustomCalendar from "./components/CustomCalendar";

export function CalendarPage() {
    return (
        <DndProvider backend={HTML5Backend}>
            <CustomCalendar />
        </DndProvider>
    );
}
