import { TaskPriority } from "../../../api/Response";

export interface EventContentProps {
    priority: TaskPriority;
    title: string;
    timeText: string;
}

const EventContent = ({ priority, title, timeText } : EventContentProps) => {
    const renderContent = () => {
        switch (priority) {
            case TaskPriority.High:
                return (
                    <div
                        className="bg-utility-pink-50 font-semibold min-w-[180px]
                        rounded-md border border-utility-pink-200 px-2 py-1 mx-2 flex flex-row justify-between 
                        "
                    >
                        <span className="text-utility-pink-700 font-semibold">
                            {title}
                        </span>
                        <span className="text-utility-pink-600">
                            {timeText}
                        </span>
                    </div>
                );

            case TaskPriority.Low:
                return (
                    <div className="bg-[#EDFCF2] rounded-md border mx-2  border-[#AAF0C4] px-2 py-1 flex flex-row justify-between">
                        <span className="text-utilGreen700 font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
                            {title}
                        </span>
                        <span className="text-utilGreen600">{timeText}</span>
                    </div>
                );

            case TaskPriority.Medium:
                return (
                    <div className="bg-utility-yellow-50 mx-2 font-semibold  rounded-md border border-utility-yellow-200 px-2 py-1 flex flex-row justify-between">
                        <span className="text-utility-yellow-700 font-semibold text-ellipsis mr-2">
                            {title}
                        </span>
                        <span className="text-utility-yellow-600">
                            {timeText}
                        </span>
                    </div>
                );

            default:
                return (
                    <>
                        <b>{timeText}</b>
                        <i>{title}</i>
                    </>
                );
        }
    };

    return renderContent();
};

export default EventContent;
