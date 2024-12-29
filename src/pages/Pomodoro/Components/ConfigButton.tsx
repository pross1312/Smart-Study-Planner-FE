function ConfigButton({
    children,
    onClick,
}: {
    children: React.ReactNode;
    onClick?: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="w-12 h-12 rounded-lg flex items-center justify-center path--fill-current bg-c-gray-800 transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-opacity-70 text-white st-onboarding-background"
        >
            {children}
        </button>
    );
}

export default ConfigButton;
