import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";

function TimerInput({
    header,
    time,
    onClickPlus,
    onCLickMinus,
}: {
    header: string;
    time: string;
    onClickPlus: () => void;
    onCLickMinus: () => void;
}) {
    return (
        <>
            <div className="mb-1 text-center text-xs ">{header}</div>
            <div className="flex justify-between">
                <button
                    className="hover:opacity-80"
                    title="Reduce time"
                    onClick={onCLickMinus}
                >
                    <FiMinus />
                </button>
                <div className="rounded-xl bg-[#0b0403] px-3">
                    <span className="text-[2rem] font-bold leading-[38px] tracking-[2px]">
                        {time}
                    </span>
                </div>
                <button
                    onClick={onClickPlus}
                    className="hover:opacity-80"
                    title="Add time"
                >
                    <GoPlus />
                </button>
            </div>
        </>
    );
}

export default TimerInput;
