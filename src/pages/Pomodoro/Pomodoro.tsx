import { useEffect, useRef, useState } from "react";
import CustomButton from "./Components/CustomButton";
import ConfigButton from "./Components/ConfigButton";
import { FaPencilAlt } from "react-icons/fa";
import { SlPicture } from "react-icons/sl";
import { LuMusic } from "react-icons/lu";
import { FaQuoteLeft } from "react-icons/fa6";
import { IoStatsChartOutline } from "react-icons/io5";
import VideoPlayer from "./Components/VideoPlayer";
import MusicModal from "./Modal/MusicModal";
import Quotes from "./Components/Quotes";
import QuotesModal from "./Modal/QuotesModal";
import TimerModal from "./Modal/TimerModal";
import EndSessionModal from "./Modal/EndSessionModal";
import { useSound } from "use-sound";
import startSfx from "@/assets/sounds/startTimer.mp3";
import pauseSfx from "@/assets/sounds/pauseTimer.mp3";
import { useFocus } from "../../store/FocusContext";
import { addHistory, getSetting } from "../../api/pomodoro.api";
import SessionGoalModal from "./Modal/SesssionGoalModal";
import { getTasks } from "../../api/task.api";
import { useSearchParams } from "react-router-dom";
import { Task, TaskStatus } from "../../api/Response";
import { toast } from "react-toastify";

export enum ModalType {
    Timer,
    Music,
    Background,
    Quotes,
    Stats,
    CLOSED,
}

const quotes = [
    {
        quote: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
    },
    {
        quote: "Remind yourself. Nobody built like you, you design yourself.",
        author: "Jay-Z",
    },
    {
        quote: "We are not our best intentions. We are what we do",
        author: "Amy Dickinson",
    },
    {
        quote: "Your talents and abilities will improve over time, but for that you have to start.",
        author: "Martin Luther King",
    },
    {
        quote: "Live as if you were to die tomorrow. Learn as if you were to live forever",
        author: "Mahatma Gandhi",
    },
];

function Pomodoro() {
    const POMODORO_STEP = 5;

    const { isFocusing, setIsFocusing } = useFocus();

    const [pomoLength, setPomoLength] = useState(25);
    const [shortLength, setShortLength] = useState(5);

    const [isOpenTimerModal, setIsOpenTimerModal] = useState(true);
    const [isHideQuotes, setIsHideQuotes] = useState(true);

    const [isActive, setIsActive] = useState(false);
    const [buttonText, setButtonText] = useState("START");
    const [isEndSession, setIsEndSession] = useState(false);
    // const [volume, setVolume] = useState(1);
    // const [tasks, setTasks] = useState<Task[]>([]);

    const [isOpenSettingModal, setIsOpenSettingModal] = useState<ModalType>(
        ModalType.CLOSED
    );
    const [secondsLeft, setSecondsLeft] = useState(pomoLength * 60);
    const [quote, setQuote] = useState(quotes[0]);
    const [isOpenTaskManager, setIsOpenTaskManager] = useState(true);

    const startFocusTime = useRef(0);

    const [searchParams] = useSearchParams();
    const taskId = Number.parseInt(searchParams.get("taskId") || "0");

    const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);

    const totalTaskInDay = useRef(0);
    const totalTimeDoneInDay = useRef(0);

    const [isStartBreakTimer, setIsStartBreakTimer] = useState(false);

    // Initialize useEffect
    useEffect(() => {
        const fetchSetting = async () => {
            try {
                const response = await getSetting();
                setPomoLength(+response.data.data.pomodoro_time);
                setShortLength(+response.data.data.break_time);
            } catch (error) {
                console.error("Failed to fetch setting", error);
            }
        };

        fetchSetting();
    }, []);

    useEffect(() => {
        setSecondsLeft(pomoLength * 60);
    }, [pomoLength]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                console.log(taskId);
                if (!taskId) return;
                const response = await getTasks();
                // setTasks(response.data.tasks);
                const currentTask = response.data.tasks.find(
                    (task) => task.id == taskId
                );
                setCurrentTask(currentTask);

                if (!currentTask) {
                    toast.warning("Task not found");
                    return;
                }

                const startOfDay = new Date();
                startOfDay.setHours(0, 0, 0, 0); // 00:00:00

                const endOfDay = new Date(startOfDay);
                endOfDay.setHours(23, 59, 59, 999); // 23:59:59

                totalTaskInDay.current = response.data.tasks.filter((task) => {
                    const startTime = task.start_time; // start_time của task
                    const endTime = task.end_time; // end_time của task

                    // Kiểm tra start_time và end_time của task nằm trong khoảng thời gian của ngày
                    return (
                        startTime !== null &&
                        startTime >= Math.floor(startOfDay.getTime() / 1000) &&
                        startTime <= Math.floor(endOfDay.getTime() / 1000) &&
                        endTime !== null &&
                        endTime >= Math.floor(startOfDay.getTime() / 1000) &&
                        endTime <= Math.floor(endOfDay.getTime() / 1000)
                    );
                }).length;

                totalTimeDoneInDay.current = response.data.tasks.filter(
                    (task) => {
                        const startTime = task.start_time; // start_time của task
                        const endTime = task.end_time; // end_time của task

                        // Kiểm tra start_time và end_time của task nằm trong khoảng thời gian của ngày
                        return (
                            startTime !== null &&
                            startTime >=
                                Math.floor(startOfDay.getTime() / 1000) &&
                            startTime <=
                                Math.floor(endOfDay.getTime() / 1000) &&
                            endTime !== null &&
                            endTime >=
                                Math.floor(startOfDay.getTime() / 1000) &&
                            endTime <= Math.floor(endOfDay.getTime() / 1000) &&
                            task.status === TaskStatus.Done
                        );
                    }
                ).length;

                const now = Math.floor(Date.now() / 1000);
                const timeDifference = currentTask.end_time || 0 - now;

                if (timeDifference > 0) {
                    console.log("timeDifference " + timeDifference);
                    const timeoutId = setTimeout(() => {
                        onDeadlineReached();
                    }, timeDifference * 1000);

                    return () => clearTimeout(timeoutId);
                } else toast.warning("Task deadline has passed");
            } catch (error) {
                console.error("Failed to fetch todos:", error);
            }
        };

        fetchTasks();
    }, [taskId]);

    const [play] = useSound(startSfx, {
        interrupt: true,
        volume: 1,
    });

    const [pause] = useSound(pauseSfx, {
        interrupt: true,
        volume: 1,
    });

    const handleShuffleQuotes = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
    };

    const handleStartFocusTimerClick = () => {
        if (isActive) {
            pause();
        } else {
            play();
        }
        setIsActive(!isActive);
        setIsFocusing(true);
        setButtonText(isActive ? "RESUME" : "PAUSE");
        setIsOpenTimerModal(true);
        startFocusTime.current = new Date().getTime();
    };

    const handleStopFocusTimer = () => {
        setIsActive(false);
        setIsFocusing(!isFocusing);
        setButtonText("START");
        setSecondsLeft(pomoLength * 60);
    };

    const handleStartBreakTimer = () => {
        setIsActive(!isActive);
        setSecondsLeft(shortLength * 60);
        setIsStartBreakTimer(true);
        setIsFocusing(false);
    };

    const handleStopBreakTimer = () => {
        setIsActive(false);
        setIsStartBreakTimer(false);
        setSecondsLeft(pomoLength * 60);
    };

    const handlePauseFocusTimer = () => {
        setIsActive(!isActive);
    };

    useEffect(() => {
        const createHistory = async () => {
            if (isEndSession) {
                const endTimer = Math.floor(new Date().getTime() / 1000);
                const span = shortLength * 60;
                try {
                    await addHistory(
                        Math.floor(startFocusTime.current / 1000),
                        endTimer,
                        span
                    );
                } catch (error) {
                    console.error("Failed to create history", error);
                }
            }
        };

        createHistory();
    }, [isEndSession]);

    const onDeadlineReached = () => {
        setIsEndSession(true);
        setIsActive(true);
    };

    return (
        <div className="flex flex-1 relative flex-col gap-3 p-3 items-center min-h-full overflow-hidden">
            <VideoPlayer />

            <div className="flex justify-between items-center w-full z-10">
                <div className="flex gap-2">
                    <CustomButton
                        text="Personal timer"
                        icon={<FaPencilAlt />}
                        onClick={() => setIsOpenTimerModal(!isOpenTimerModal)}
                    />
                    <CustomButton
                        onClick={() => setIsOpenTaskManager(!isOpenTaskManager)}
                        text="Session goal"
                        icon={<FaPencilAlt />}
                    />
                </div>

                <div className="relative  flex flex-col space-y-2 text-sm md:static md:flex-row md:space-y-0 md:space-x-2">
                    <div className="flex gap-2">
                        <ConfigButton>
                            <SlPicture />
                        </ConfigButton>
                        <ConfigButton
                            onClick={() =>
                                setIsOpenSettingModal(
                                    isOpenSettingModal === ModalType.Music
                                        ? ModalType.CLOSED
                                        : ModalType.Music
                                )
                            }
                        >
                            <LuMusic />
                        </ConfigButton>
                        <ConfigButton
                            onClick={() =>
                                setIsOpenSettingModal(ModalType.Quotes)
                            }
                        >
                            <FaQuoteLeft />
                        </ConfigButton>
                        <ConfigButton>
                            <IoStatsChartOutline />
                        </ConfigButton>
                    </div>
                    <MusicModal
                        setIsOpenModal={setIsOpenSettingModal}
                        isOpenModal={isOpenSettingModal}
                    />
                    <QuotesModal
                        isOpenModal={isOpenSettingModal}
                        setIsOpenModal={setIsOpenSettingModal}
                        onShuffleQuotes={handleShuffleQuotes}
                        setIsHideQuotes={setIsHideQuotes}
                        isHideQuotes={isHideQuotes}
                    />
                </div>
            </div>

            <div className="w-full h-full flex flex-col gap-2">
                <TimerModal
                    isActive={isActive}
                    setIsActive={setIsActive}
                    buttonText={buttonText}
                    setButtonText={setButtonText}
                    isFocusDone={isEndSession}
                    setIsFocusDone={setIsEndSession}
                    onClickPlusTime={() =>
                        setPomoLength(pomoLength + POMODORO_STEP)
                    }
                    onClicKMinusTime={() =>
                        setPomoLength(
                            pomoLength - POMODORO_STEP > 0
                                ? pomoLength - POMODORO_STEP
                                : 0
                        )
                    }
                    onClicKMinusBreakTime={() =>
                        setShortLength(
                            shortLength - POMODORO_STEP > 0
                                ? shortLength - POMODORO_STEP
                                : 0
                        )
                    }
                    onClickPlusBreakTime={() =>
                        setShortLength(shortLength + POMODORO_STEP)
                    }
                    isOpenModal={isOpenTimerModal}
                    setIsOpenModal={setIsOpenTimerModal}
                    shortLength={shortLength}
                    secondsLeft={secondsLeft}
                    setSecondsLeft={setSecondsLeft}
                    volume={1}
                    handleStartFocusTimerClick={handleStartFocusTimerClick}
                    handleStopFocusTimer={handleStopFocusTimer}
                    handlePauseFocusTimer={handlePauseFocusTimer}
                    isStartBreakTimer={isStartBreakTimer}
                    handleStopBreakTimer={handleStopBreakTimer}
                />
                <SessionGoalModal
                    task={currentTask}
                    isOpen={isOpenTaskManager}
                    setIsOpen={setIsOpenTaskManager}
                    totalTaskInDay={totalTaskInDay.current}
                    completedTaskInDay={totalTimeDoneInDay.current}
                />
            </div>

            <Quotes quote={quote} isOpen={isHideQuotes} />

            <EndSessionModal
                handleStartBreakTimer={handleStartBreakTimer}
                isEndSession={isEndSession}
                setIsEndSession={setIsEndSession}
                setIsActive={setIsActive}
                setIsOpenTimerModal={setIsOpenTimerModal}
                handleStartFocusTimerClick={handleStartFocusTimerClick}
                handleStopFocusTimer={handleStopFocusTimer}
            />
        </div>
    );
}

export default Pomodoro;
