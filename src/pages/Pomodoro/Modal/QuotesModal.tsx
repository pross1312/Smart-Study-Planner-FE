import { FaQuoteLeft, FaRegEyeSlash } from "react-icons/fa";
import { RiCloseLargeLine } from "react-icons/ri";
import { ModalType } from "../Pomodoro";
import { CiShuffle } from "react-icons/ci";
import { BiHide } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa6";

interface QuotesModalProps {
    isOpenModal: ModalType;
    setIsOpenModal: (isOpen: ModalType) => void;
    onShuffleQuotes: () => void;
    isHideQuotes: boolean;
    setIsHideQuotes: (isHide: boolean) => void;
}

function QuotesModal({
    isOpenModal,
    setIsOpenModal,
    onShuffleQuotes,
    isHideQuotes,
    setIsHideQuotes,
}: QuotesModalProps) {
    if (isOpenModal !== ModalType.Quotes) return null;

    return (
        <div
            className="overlay-scroll-list transition-opacity absolute duration-250 ease-in-out w-[268px] 
        backdrop-blur bg-c-gray-800 p-6 rounded-2xl bg-opacity-90 top-24 right-6 overflow-auto text-white"
        >
            <div className="flex justify-between items-center mb-3">
                <span className="flex gap-2 items-center">
                    <FaQuoteLeft />
                    <span>Motivational quote</span>
                </span>
                <button onClick={() => setIsOpenModal(ModalType.CLOSED)}>
                    <RiCloseLargeLine />
                </button>
            </div>
            <div className="w-full flex flex-col gap-2">
                <button
                    title="shuffle"
                    className="mb-1 flex items-center hover:opacity-50"
                    onClick={onShuffleQuotes}
                >
                    <CiShuffle className="mr-1 h-5 w-5" />
                    Shuffle
                </button>

                <button
                    title="hide"
                    className="mb-1 flex items-center hover:opacity-50"
                    onClick={() => setIsHideQuotes(!isHideQuotes)}
                >
                    {isHideQuotes ? (
                        <FaRegEyeSlash className="mr-1 h-5 w-5" />
                    ) : (
                        <FaRegEye className="mr-1 h-5 w-5" />
                    )}
                    {isHideQuotes ? "Hide" : "Show"}
                </button>
            </div>
        </div>
    );
}

export default QuotesModal;
