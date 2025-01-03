function TaskItem() {
    return (
        <div className="flex space-x-2 w-full px-3 py-2 items-center rounded-lg bg-gray-600 bg-opacity-40">
            <div className="flex justify-center w-5 h-5 border-2 border-solid rounded-full cursor-pointer border-white bg-transparent"></div>
            <div className="break-word w-[calc(100%-36px)] flex-1 text-xs">
                Integrate with Google Calendar
            </div>
            <p className="text-xs">16:00 - 17:00</p>

            <div className="flex items-center">
                <button type="button">
                    <svg width="16" height="16" fill="none">
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5.148 11.803a.672.672 0 0 1-1.003-.892l.052-.059 6.655-6.655a.672.672 0 0 1 1.003.892l-.052.059-6.655 6.655Zm6.655 0a.672.672 0 0 1-.892.052l-.059-.052-1.426-1.426a.672.672 0 0 1 .892-1.003l.059.052 1.426 1.426a.672.672 0 0 1 0 .951ZM5.682 6.626a.672.672 0 0 0 .892-1.003L5.148 4.197l-.059-.052a.672.672 0 0 0-.892 1.003l1.426 1.426.059.052Z"
                            fill="#7B7170"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}
function SessionGoalModal() {
    return (
        <div className="flex justify-between w-full bg-black bg-opacity-50">
            <div className="fixed flex items-center justify-center ">
                <div className="transition-opacity duration-250 ease-in-out w-[312px] backdrop-blur bg-c-gray-800 p-6 rounded-2xl bg-opacity-90 mb-3 text-white">
                    <div className="flex justify-between">
                        <div className="flex">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="icons--tiny"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M12 19a6 6 0 005.765-7.667l1.558-1.558a8 8 0 11-1.422-2.177l-1.416 1.417A6 6 0 1012 19zm-2-6a2 2 0 013.245-1.565 1 1 0 101.247-1.564 4 4 0 101.182 4.712 1 1 0 10-1.836-.792A2 2 0 0110 13z"
                                    fill="#FF6F61"
                                ></path>
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M16.902 4.708a1 1 0 01.242-1.024l1.112-1.112a.5.5 0 01.828.196l.434 1.3.775-.775a1 1 0 111.414 1.414l-.91.91 1.445.398a.5.5 0 01.221.835l-1.096 1.097a1 1 0 01-.984.253L18.7 7.715l-4.993 4.992a1 1 0 01-1.414-1.414l5.103-5.104-.494-1.481z"
                                    fill="#9656A1"
                                ></path>
                                <path
                                    d="M12 12h1v1h-1v-1z"
                                    fill="#9656A1"
                                ></path>
                            </svg>
                            <b className="ml-1 font-bold">Task Manager</b>
                        </div>
                        <div className="flex">
                            <div>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="ml-2 h-4 w-4"
                                >
                                    <g fill="none" fill-rule="evenodd">
                                        <path
                                            d="M12 11a1 1 0 01.993.883L13 12v3a1 1 0 01-1.993.117L11 15v-3a1 1 0 011-1zm0-3a1 1 0 110 2 1 1 0 010-2z"
                                            fill="#FF6F61"
                                        ></path>
                                        <path
                                            d="M12 3a9 9 0 018.19 12.738 1 1 0 11-1.82-.832 7 7 0 10-2.408 2.865 1 1 0 111.134 1.648A9 9 0 1112 3z"
                                            fill="#9656A1"
                                            fill-rule="nonzero"
                                        ></path>
                                    </g>
                                </svg>
                            </div>
                            <button
                                className="ml-3 cursor-pointer"
                                title="Minimize"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-2.5 w-2.5"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M3.674 23.365a1.989 1.989 0 01-2.966-2.639l.154-.174L20.547.867a1.988 1.988 0 012.967 2.64l-.154.173L3.674 23.365zM5.253 8.056a1.989 1.989 0 002.64-2.966L3.672.87 3.5.717A1.989 1.989 0 00.862 3.684L5.08 7.902l.173.154zm15.47 15.46a1.989 1.989 0 002.638-2.967l-4.218-4.219-.173-.154a1.989 1.989 0 00-2.64 2.966l4.22 4.219.172.154z"
                                        fill="#fff"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div>
                        <div className="overflow-y-overlay mt-[6px] max-h-[300px] space-y-2.5 pt-2.5">
                            <TaskItem />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SessionGoalModal;
