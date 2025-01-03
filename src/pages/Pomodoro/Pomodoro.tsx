import { useEffect, useState } from "react";
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
import startSfx from "../../assets/sounds/startTimer.mp3";
import pauseSfx from "../../assets/sounds/pauseTimer.mp3";
import { useFocus } from "../../store/FocusContext";
import SessionGoalModal from "./Modal/SesssionGoalModal";

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

    const [isOpenTimerModal, setIsOpenTimerModal] = useState(false);
    const [isHideQuotes, setIsHideQuotes] = useState(true);

    const [isActive, setIsActive] = useState(false);
    const [buttonText, setButtonText] = useState("START");
    const [isEndSession, setIsEndSession] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isOpenSettingModal, setIsOpenSettingModal] = useState<ModalType>(
        ModalType.CLOSED
    );
    const [secondsLeft, setSecondsLeft] = useState(pomoLength * 1);

    useEffect(() => {
        setSecondsLeft(pomoLength * 60);
    }, [pomoLength]);

    const [play] = useSound(startSfx, {
        interrupt: true,
        volume: volume,
    });

    const [pause] = useSound(pauseSfx, {
        interupt: true,
        volume: volume,
    });

    const handleShuffleQuotes = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
    };
    const [quote, setQuote] = useState(quotes[0]);

    const handleStartFocusTimerClick = () => {
        if (isActive) {
            pause();
        } else {
            play();
        }
        setIsActive(!isActive);
        setIsFocusing(!isFocusing);
        setButtonText(isActive ? "RESUME" : "PAUSE");
        setIsOpenTimerModal(true);
    };

    const handleStartBreakTimer = () => {
        setIsActive(!isActive);
        setButtonText("START");
        setSecondsLeft(shortLength * 60);
    };

    const handleStopFocusTimer = () => {
        setIsActive(false);
        setIsFocusing(!isFocusing);
        setButtonText("START");
        setSecondsLeft(pomoLength * 60);
    };

    const handlePauseFocusTimer = () => {
        setIsActive(!isActive);
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
                    <CustomButton text="Session goal" icon={<FaPencilAlt />} />
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
                volume={volume}
                handleStartFocusTimerClick={handleStartFocusTimerClick}
                handleStopFocusTimer={handleStopFocusTimer}
                handlePauseFocusTimer={handlePauseFocusTimer}
            />
            <SessionGoalModal />

            <Quotes quote={quote} isOpen={isHideQuotes} />

            <EndSessionModal
                handleStartBreakTimer={handleStartBreakTimer}
                isEndSession={isEndSession}
                setIsEndSession={setIsEndSession}
                setIsActive={setIsActive}
                setIsOpenTimerModal={setIsOpenTimerModal}
                handleStartFocusTimerClick={handleStartFocusTimerClick}
            />
        </div>
    );
}

export default Pomodoro;
