import { AiOutlineClose } from "react-icons/ai";
import "../css/EndSessionModal.css";

function EndSessionModal() {
    return (
        <>
            <div className="Modal__backdrop absolute inset-0 z-20"></div>
            <div className="Modal__inner  z-30">
                <div className="Modal__window relative p-10 w-full max-w-[580px] rounded-2xl bg-white">
                    <button className="Modal__close">
                        <AiOutlineClose />
                    </button>
                    <div>
                        <div className="Modal__header"></div>
                        <div className="Modal__content">
                            <div>
                                <div>
                                    <h3 className="mb-3 font-black text-[#FF6F61] text-2xl">
                                        Well done 🎉, @Huy Phạm Hoàng Gia
                                    </h3>
                                    <div>
                                        A quick summary of what you
                                        <strong className="font-bold">
                                            {" "}
                                            achieved{" "}
                                        </strong>
                                        in this study session:
                                    </div>
                                    <div className="mt-6 mb-4 flex flex-col items-center md:flex-row">
                                        <div className="flex h-16 w-full rounded-xl bg-[#F4EEF4] p-3 md:mr-5 md:mb-0">
                                            <div className="mr-3 rounded-lg bg-white p-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="28"
                                                    height="28"
                                                    fill="none"
                                                    viewBox="0 0 28 28"
                                                    className="icons--small"
                                                >
                                                    <path
                                                        fill="#9656A1"
                                                        fill-rule="evenodd"
                                                        d="M24.5 16.255V21a1.169 1.169 0 01-1.587 1.088l-.004-.001-.02-.008-.082-.03a22.797 22.797 0 00-1.429-.467c-.915-.264-1.949-.493-2.712-.493-.762 0-1.797.229-2.712.493-.442.128-.83.256-1.106.352l-.322.114-.083.031-.011.005a1.179 1.179 0 01-.862 0l-.013-.005-.083-.03a22.797 22.797 0 00-1.429-.467c-.915-.264-1.949-.493-2.712-.493-.762 0-1.797.229-2.712.493-.442.128-.83.256-1.106.352l-.322.114-.083.031-.02.008-.004.001A1.168 1.168 0 013.5 21V8.078c0-.483.297-.916.747-1.089l.004-.002.008-.003.028-.01.1-.038c.087-.031.21-.076.363-.129.306-.106.734-.247 1.224-.389.95-.274 2.25-.584 3.36-.584.456 0 .945.053 1.428.133a9.4 9.4 0 00-.26 2.202v.121a6.793 6.793 0 00-1.169-.123c-.762 0-1.797.229-2.712.493-.291.084-.56.169-.788.244v10.479l.141-.042c.95-.274 2.25-.584 3.36-.584 1.109 0 2.408.31 3.358.584l.141.041v-5.041a9.364 9.364 0 002.334 1.912v3.13l.14-.042c.95-.274 2.25-.584 3.36-.584 1.109 0 2.408.31 3.358.584l.141.041V17.21a9.315 9.315 0 002.334-.954zM10.805 10.54a1.132 1.132 0 00-.304-.04H8.167a1.166 1.166 0 100 2.333h2.334c.404 0 .76-.206.97-.518a9.205 9.205 0 01-.666-1.775zM10.501 14H8.167a1.167 1.167 0 000 2.333h2.334a1.166 1.166 0 100-2.333z"
                                                        clip-rule="evenodd"
                                                    ></path>
                                                    <path
                                                        fill="#FF6F61"
                                                        fill-rule="evenodd"
                                                        d="M19.832 15.166a7 7 0 100-14 7 7 0 000 14zm1.166-10.499a1.167 1.167 0 00-2.334 0v4.299c0 .392.198.759.526.974l2.333 1.536a1.167 1.167 0 001.283-1.95l-1.808-1.19V4.668z"
                                                        clip-rule="evenodd"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <div className="text-black">
                                                <p className="text--caption">
                                                    Session time
                                                </p>
                                                <p className="text--large">
                                                    <b className="font-bold">
                                                        10
                                                    </b>{" "}
                                                    Mins
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex h-16 w-full rounded-xl bg-[#F4EEF4] p-3">
                                            <div className="mr-3 rounded-lg bg-white p-2">
                                                <svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="icons--small"
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
                                            </div>
                                            <div className="text-black">
                                                <p className="text--caption">
                                                    Goals completed
                                                </p>
                                                <p className="text--large">
                                                    <b className="font-bold">
                                                        0
                                                    </b>
                                                    /0
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-[30px] flex justify-end">
                                    <button
                                        type="button"
                                        className="btn-a btn-a-lg btn-a-secondary w-full md:w-auto"
                                    >
                                        Continue studying
                                    </button>
                                    <button
                                        type="button"
                                        className="btn-a btn-a-lg btn-a-primary ml-4 w-full md:w-auto"
                                    >
                                        Start break
                                    </button>
                                </div>
                            </div>
                            <div className="pointer-events-none fixed top-1/2 left-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2 md:left-[calc(50%+44px)] md:w-auto ">
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EndSessionModal;
