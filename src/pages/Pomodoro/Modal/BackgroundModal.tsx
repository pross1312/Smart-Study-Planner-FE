import VolumnInput from "../Components/VolumnInput";

function BackgroundModal() {
    return (
        <div
            className="transition-opacity absolute duration-250 ease-in-out w-[268px] 
        backdrop-blur bg-c-gray-800 p-6 rounded-2xl bg-opacity-90 top-32 right-6 overflow-auto h-[400px] "
        >
            <div>
                <span>header</span>
            </div>
            <div className="w-full flex flex-col gap-2">
                <div></div>
            </div>
        </div>
    );
}

export default BackgroundModal;
