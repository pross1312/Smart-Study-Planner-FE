export type DeleteModalProps = {
    title?: string;
    message?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const DeleteModal = ({
    title = "Are you sure?",
    message = "Do you really want to perform this action?",
    confirmButtonText = "Yes, I'm sure",
    cancelButtonText = "No, cancel",
    onConfirm,
    onCancel,
    isOpen = false,
    setIsOpen,
}: DeleteModalProps) => {
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
                    <div
                        className={`modal-container ${
                            isOpen ? "modal-enter" : "modal-exit"
                        } relative p-4 w-full max-w-md h-full md:h-auto`}
                    >
                        {/* Modal Content */}
                        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                            <div className="flex justify-center mb-4">
                                <h2 className="text-black font-bold">
                                    {title}
                                </h2>
                                {/* Close Button */}
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className="text-gray-400 absolute right-1 top-[6px] bg-transparent hover:bg-black hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center"
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* Modal Icon */}
                            <svg
                                className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            {/* Modal Message */}
                            <p className="mb-4 text-black dark:text-gray-300">
                                {message}
                            </p>
                            <div className="flex justify-center items-center space-x-4">
                                {/* Cancel Button */}
                                <button
                                    onClick={() => {
                                        onCancel?.();
                                        toggleModal();
                                    }}
                                    className="py-2 px-3 text-sm font-medium text-black bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                >
                                    {cancelButtonText}
                                </button>
                                {/* Confirm Button */}
                                <button
                                    onClick={() => {
                                        onConfirm?.();
                                        toggleModal();
                                    }}
                                    className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                                >
                                    {confirmButtonText}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteModal;
