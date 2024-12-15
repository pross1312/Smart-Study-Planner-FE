import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { EventTag, INITIAL_EVENTS, createEventId } from "./event-utils";
import { createRef, useState } from "react";
import AddTaskModal from "./AddTaskModal";
import CustomHeader from "./CustomHeader";
import { Box, Modal, TextField } from "@mui/material";

export function CustomCalendar() {
    const [isOpenAddTaskModal, setIsOpenAddTaskModal] = useState(true);
    const [selectedInfo, setSelectedInfo] = useState<any>(null);
    const [modalPosition, setModalPosition] = useState<{
        top: number;
        left: number;
    }>({ top: 0, left: 0 });

    const calendarRef = createRef<FullCalendar>();

    function handleDateClick(selectInfo: any) {
        setIsOpenAddTaskModal(true);
        setSelectedInfo(selectInfo);
        setModalPosition({
            top: selectInfo.jsEvent.pageY,
            left: selectInfo.jsEvent.pageX,
        });
    }

    const modalStyles = {
        position: "absolute",
        top: modalPosition.top + 10,
        left: modalPosition.left + 10,
        zIndex: 9999,
    };

    return (
        <div className="flex text-sm min-h-full justify-center items-center">
            <Sidebar />
            <div className="flex-grow border border-border-secondary rounded-xl  mx-auto my-auto">
                <CustomHeader calendarRef={calendarRef} />
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={false}
                    initialEvents={INITIAL_EVENTS}
                    editable={true}
                    selectable={true}
                    dateClick={handleDateClick}
                    eventContent={renderEventContent}
                />
            </div>
            {isOpenAddTaskModal && (
                <AddTaskModal
                    onClose={setIsOpenAddTaskModal}
                    selectedInfo={selectedInfo}
                    modalPosition={modalPosition}
                ></AddTaskModal>
            )}
        </div>
    );
}

function renderEventContent(eventInfo) {
    const { tag } = eventInfo.event.extendedProps;
    if (tag === EventTag.NEW) {
        return (
            <div
                className="bg-utility-pink-50 font-semibold 
                rounded-md border border-utility-pink-200 px-2 py-1 mx-2 flex flex-row justify-between 
                -my-3
                "
            >
                <span className="text-utility-pink-700 font-semibold">
                    {eventInfo.event.title}
                </span>
                <span className="text-utility-pink-600">
                    {eventInfo.timeText}
                </span>
            </div>
        );
    }
    if (tag === EventTag.BREAK) {
        return (
            <div className="bg-[#EDFCF2] rounded-md border mx-2 -my-3 border-[#AAF0C4] px-2 py-1 flex flex-row justify-between">
                <span className="text-utilGreen700 font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
                    {eventInfo.event.title}
                </span>
                <span className="text-utilGreen600 ">{eventInfo.timeText}</span>
            </div>
        );
    }
    if (tag === EventTag.MEDIUM) {
        return (
            <div className="bg-utility-yellow-50 mx-2 font-semibold -my-3 rounded-md border border-utility-yellow-200 px-2 py-1 flex flex-row justify-between">
                <span className="text-utility-yellow-700 font-semibold text-ellipsis">
                    {eventInfo.event.title}
                </span>
                <span className="text-utility-yellow-600">
                    {eventInfo.timeText}
                </span>
            </div>
        );
    }
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    );
}

function Sidebar() {
    return (
        <div className="w-64 border-r-2 border-r-gray-200 bg-[#eaf9ff]">
            <div className="p-[2em]">
                <h2 className="text-base font-semibold">
                    TODO: Implement Side Bar
                </h2>
                <ul></ul>
            </div>
        </div>
    );
}
