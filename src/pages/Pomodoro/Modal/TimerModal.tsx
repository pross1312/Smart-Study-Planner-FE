import { FaPencilAlt, FaPlay, FaSquare } from "react-icons/fa";
import { VscUnmute } from "react-icons/vsc";
import { AiOutlineClose } from "react-icons/ai";
import TimerInput from "../Components/TimerInput";
import { useSound } from "use-sound";
import startSfx from "../../../assets/sounds/startTimer.mp3";
import pauseSfx from "../../../assets/sounds/pauseTimer.mp3";
import timesUpSfx from "../../../assets/sounds/timesUp.mp3";
import { useEffect, useState } from "react";
import { useFocus } from "../../../store/FocusContext";
import { IoMdPause } from "react-icons/io";

interface TimerModalProps {
    isOpenModal: boolean;
    setIsOpenModal: (isOpen: boolean) => void;
    shortLength: number;
    onClickPlusTime: () => void;
    onClicKMinusTime: () => void;
    onClickPlusBreakTime: () => void;
    onClicKMinusBreakTime: () => void;
    pomoLength: number;
}
const TimerModal = ({
    isOpenModal,
    setIsOpenModal,
    shortLength,
    onClickPlusTime,
    onClicKMinusTime,
    onClickPlusBreakTime,
    onClicKMinusBreakTime,
    pomoLength,
}: TimerModalProps) => {
    if (!isOpenModal) return null;

    const [secondsLeft, setSecondsLeft] = useState(pomoLength * 60);

    const [volume, setVolume] = useState(1);
    const [isActive, setIsActive] = useState(false);
    const [buttonText, setButtonText] = useState("START");

    const { isFocusing, setIsFocusing } = useFocus();

    const [play] = useSound(startSfx, {
        interrupt: true,
        volume: volume,
    });

    const [pause] = useSound(pauseSfx, {
        interupt: true,
        volume: volume,
    });

    const [timesUp] = useSound(timesUpSfx, {
        volume: volume,
    });

    useEffect(() => {
        setSecondsLeft(pomoLength * 60);
    }, [pomoLength]);

    useEffect(() => {
        if (isActive) {
            const originalWindowOpen = window.open;
            window.open = (...args) => {
                alert("Không thể mở tab mới trong thời gian tập trung!");
                return null;
            };

            const interval = setInterval(() => {
                setSecondsLeft((secondsLeft) => secondsLeft - 1);
            }, 1000);

            if (secondsLeft === 0) {
                clearInterval(interval);
                setIsActive(false);
                timesUp();
            }

            return () => {
                clearInterval(interval);
                window.open = originalWindowOpen;
            };
        }
    }, [isActive, secondsLeft, timesUp]);

    const formatTimeLeft = (seconds: number) => {
        const hours = Math.floor(seconds / 3600)
            .toString()
            .padStart(2, "0");
        const minutes = Math.floor((seconds % 3600) / 60)
            .toString()
            .padStart(2, "0");
        const secs = (seconds % 60).toString().padStart(2, "0");
        return `${hours}:${minutes}:${secs}`;
    };

    const handleStartFocusTimerClick = () => {
        if (isActive) {
            pause();
        } else {
            play();
        }
        setIsActive(!isActive);
        setIsFocusing(!isFocusing);
        setButtonText(isActive ? "RESUME" : "PAUSE");
    };

    const handleStopFocusTimer = () => {
        setIsActive(false);
        setIsFocusing(false);
        setButtonText("START");
    };

    return (
        <div className="flex justify-between w-full bg-black bg-opacity-50">
            <div className="fixed flex items-center justify-center ">
                <div className="transition-opacity duration-250 ease-in-out w-[268px] backdrop-blur bg-c-gray-800 p-6 rounded-2xl bg-opacity-90 mb-3 text-white">
                    <div className="flex justify-between">
                        <div className="flex gap-2 items-center justify-center">
                            <FaPencilAlt className="text-sm" />
                            <span>Personal timer</span>
                        </div>
                        <div className="flex gap-2 items-center justify-center">
                            <button>
                                <VscUnmute />
                            </button>
                            <button onClick={() => setIsOpenModal(false)}>
                                <AiOutlineClose />
                            </button>
                        </div>
                    </div>
                    {isFocusing ? (
                        <div className="flex items-center justify-between">
                            <div className="my-2 text-[32px] font-bold leading-[38px] tracking-[2px]">
                                {formatTimeLeft(secondsLeft)}
                            </div>
                            <div>
                                <button
                                    className="rounded-lg hover:bg-white/10 mr-4 pointer-events-auto"
                                    title="Stop the timer"
                                    onClick={handleStopFocusTimer}
                                >
                                    <FaSquare />
                                </button>
                                <button
                                    className="rounded-lg hover:bg-white/10 pointer-events-auto"
                                    title="Pause the timer"
                                    onClick={() => setIsActive(!isActive)}
                                >
                                    {isActive ? <IoMdPause /> : <FaPlay />}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="text-white mt-3">
                                <TimerInput
                                    header="Focus time (min)"
                                    time={formatTimeLeft(secondsLeft)}
                                    onCLickMinus={onClicKMinusTime}
                                    onClickPlus={onClickPlusTime}
                                />
                            </div>
                            <div className="text-white mt-3">
                                <TimerInput
                                    header="Break time (min)"
                                    time={formatTimeLeft(shortLength * 60)}
                                    onCLickMinus={onClicKMinusBreakTime}
                                    onClickPlus={onClickPlusBreakTime}
                                />
                            </div>
                            <button
                                className="mt-4 flex h-8 w-full items-center justify-center rounded-lg border-2 border-solid 
                            border-white py-2 text-sm font-bold bg-transparent text-white hover:bg-white hover:text-black"
                                onClick={handleStartFocusTimerClick}
                            >
                                {buttonText}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TimerModal;
