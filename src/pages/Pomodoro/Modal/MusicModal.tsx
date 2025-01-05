import { FaMusic } from "react-icons/fa";
import VolumnInput from "../Components/VolumnInput";
import { RiCloseLargeLine } from "react-icons/ri";
import { ModalType } from "../Pomodoro";

interface MusicModalProps {
    isOpenModal: ModalType;
    setIsOpenModal: (isOpen: ModalType) => void;
}

function MusicModal({ isOpenModal, setIsOpenModal }: MusicModalProps) {
    if (isOpenModal !== ModalType.Music) return null;
    return (
        <div
            className="overlay-scroll-list transition-opacity absolute duration-250 ease-in-out w-[268px] 
        backdrop-blur bg-c-gray-800 p-6 rounded-2xl bg-opacity-90 top-24 right-6 overflow-auto h-[350px] "
        >
            <div className="flex justify-between items-center text-white mb-3">
                <span className="flex gap-2 items-center">
                    <FaMusic />
                    <span>Music Box</span>
                </span>
                <button onClick={() => setIsOpenModal(ModalType.CLOSED)}>
                    <RiCloseLargeLine />
                </button>
            </div>
            <div className="w-full flex flex-col gap-2">
                <VolumnInput title="Original video sound" icon={""} soundUrl="" />
                <VolumnInput
                    icon={"🌠"}
                    title="LoFi beats"
                    soundUrl={
                        "https://study-together-static-prod.st-static.com/background-sounds/1Lofi.mp3"
                    }
                />
                <VolumnInput
                    icon={"🌿"}
                    title="Nature sounds"
                    soundUrl={
                        "https://study-together-static-prod.st-static.com/background-sounds/2Nature.mp3"
                    }
                />
                <VolumnInput
                    icon={"💧"}
                    title="Rain sounds"
                    soundUrl={
                        "https://study-together-static-prod.st-static.com/background-sounds/rain-01.mp3"
                    }
                />
                <VolumnInput
                    icon={"🔥"}
                    title="Fireplace sounds"
                    soundUrl={
                        "https://study-together-static-prod.st-static.com/background-sounds/4Fire.mp3"
                    }
                />
                <VolumnInput
                    icon={"📚"}
                    title="Library ambience"
                    soundUrl={
                        "https://study-together-static-prod.st-static.com/background-sounds/5Library.mp3"
                    }
                />
                <VolumnInput
                    icon={"🎹 "}
                    title="Piano music"
                    soundUrl={
                        "https://study-together-static-prod.st-static.com/background-sounds/6piano.mp3"
                    }
                />
            </div>
        </div>
    );
}

export default MusicModal;
