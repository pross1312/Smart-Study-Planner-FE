import { FaPencilAlt, FaPlay, FaSquare } from "react-icons/fa";
import { VscUnmute } from "react-icons/vsc";
import { AiOutlineClose } from "react-icons/ai";
import TimerInput from "../Components/TimerInput";
import { useEffect, useState } from "react";
import { useFocus } from "../../../store/FocusContext";
import { IoMdPause } from "react-icons/io";
import useSound from "use-sound";

import { CiCoffeeCup } from "react-icons/ci";
import Stretch from "@/assets/tips/stretch.svg";
import Leaf from "@/assets/tips/leaf.svg";
import Lotus from "@/assets/tips/lotus.svg";
import Laptop from "@/assets/tips/laptop.svg";
import TimeUpSfx from "@/assets/sounds/pauseTimer.mp3";
import { ReactElement } from "react";

interface Tip {
    content: ReactElement;
    img: string;
}
const tips = [
    {
        content: (
            <>
                Moving your body will help your brain to stay active.{" "}
                <strong className="font-bold">Stretch</strong> and give your
                body a break from sitting all day long in front of a screen!
            </>
        ),
        img: Stretch,
    },
    {
        content: (
            <>
                Has it become messy?{" "}
                <strong className="font-bold">Tidy up your desk!</strong>{" "}
                Organising is a{" "}
                <strong className="font-bold">stress-reliever</strong> – it
                releases endorphins and helps you to prepare your mind for
                focused work.
            </>
        ),
        img: Laptop,
    },
    {
        content: (
            <>
                Fresh air is pure energy: Take a{" "}
                <strong className="font-bold">short walk</strong> around the
                block – or maybe even visit a nearby park?! Additionally, the
                greenery will{" "}
                <strong className="font-bold">relax your eyes</strong>.
            </>
        ),
        img: Leaf,
    },
    {
        content: (
            <>
                Breathing and stress are directly linked. Try this{" "}
                <strong className="font-bold">
                    Mindful Together breathing exercise
                </strong>{" "}
                in case you feel very distracted today.
            </>
        ),
        img: Lotus,
    },
] as Tip[];

interface TimerModalProps {
    isOpenModal: boolean;
    setIsOpenModal: (isOpen: boolean) => void;
    isFocusDone: boolean;
    setIsFocusDone: (isFocusDone: boolean) => void;
    shortLength: number;
    onClickPlusTime: () => void;
    onClicKMinusTime: () => void;
    onClickPlusBreakTime: () => void;
    onClicKMinusBreakTime: () => void;
    isActive: boolean;
    setIsActive: (isActive: boolean) => void;
    buttonText: string;
    setButtonText: (text: string) => void;
    volume: number;
    secondsLeft: number;
    setSecondsLeft: (secondsLeft: number) => void;
    handleStartFocusTimerClick: () => void;
    handleStopFocusTimer: () => void;
    handlePauseFocusTimer: () => void;
    isStartBreakTimer: boolean;
    handleStopBreakTimer: () => void;
}
const TimerModal = ({
    isOpenModal,
    setIsOpenModal,
    setIsFocusDone,
    isActive,
    setIsActive,
    buttonText,
    shortLength,
    onClickPlusTime,
    onClicKMinusTime,
    onClickPlusBreakTime,
    onClicKMinusBreakTime,
    volume,
    secondsLeft,
    setSecondsLeft,
    handleStartFocusTimerClick,
    handleStopFocusTimer,
    handlePauseFocusTimer,
    isStartBreakTimer,
    handleStopBreakTimer,
}: TimerModalProps) => {
    if (!isOpenModal) return null;

    const { isFocusing, setIsFocusing } = useFocus();

    const [timesUp] = useSound(TimeUpSfx, {
        volume: volume,
    });

    useEffect(() => {
        if (isActive) {
            const interval = setInterval(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000);

            if (secondsLeft === 0) {
                clearInterval(interval);
                setIsActive(false);
                setIsFocusDone(true);
                setIsFocusing(false);
                timesUp();
            }

            return () => {
                clearInterval(interval);
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

    return (
        <div className="flex justify-between w-full bg-black bg-opacity-50">
            <div className="flex items-center justify-center ">
                <div className="transition-opacity duration-250 ease-in-out w-[312px] backdrop-blur bg-c-gray-800 p-6 rounded-2xl bg-opacity-90 mb-3 text-white">
                    <div className="flex justify-between">
                        <div className="flex gap-2 items-center justify-center">
                            {isStartBreakTimer ? (
                                <CiCoffeeCup />
                            ) : (
                                <FaPencilAlt />
                            )}
                            <span>
                                {isStartBreakTimer
                                    ? "Break timer"
                                    : "Personal timer"}
                            </span>
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
                    {isFocusing && (
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
                                    onClick={handlePauseFocusTimer}
                                >
                                    {isActive ? <IoMdPause /> : <FaPlay />}
                                </button>
                            </div>
                        </div>
                    )}

                    {isStartBreakTimer && (
                        <BreakSection
                            handleStopBreakTimer={handleStopBreakTimer}
                            secondsLeftFormatted={formatTimeLeft(secondsLeft)}
                            tips={tips}
                            breakTime={shortLength}
                        />
                    )}

                    {!isFocusing && !isStartBreakTimer && (
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

function BreakSection({
    secondsLeftFormatted,
    tips,
    breakTime,
    handleStopBreakTimer,
}: {
    secondsLeftFormatted: string;
    tips: Tip[];
    breakTime: number;
    handleStopBreakTimer: () => void;
}) {
    const [currentTip, setCurrentTip] = useState(
        tips[Math.floor(Math.random() * tips.length)]
    );
    useEffect(() => {
        const changedTipsTime = Math.floor(breakTime / tips.length) * 30;

        const changeTipsInterval = setInterval(() => {
            setCurrentTip(tips[Math.floor(Math.random() * tips.length)]);
        }, changedTipsTime * 1000);

        return () => {
            clearInterval(changeTipsInterval);
        };
    }, []);
    return (
        <>
            <div className="flex justify-between items-center w-full mt-2">
                <span className="text-[2rem] font-bold leading-[38px] tracking-[2px]">
                    {secondsLeftFormatted}
                </span>

                <button
                    onClick={handleStopBreakTimer}
                    className="border-b text-sm border-solid border-white leading-5 text-white"
                >
                    Skip break
                </button>
            </div>

            <div className="border-t border-solid border-white mt-4 pt-4">
                <p className="text-xs text-white">{currentTip.content}</p>
                <div className="flex justify-center">
                    <img src={currentTip.img} alt="" />
                </div>
            </div>
        </>
    );
}

export default TimerModal;
