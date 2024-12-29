function CustomButton({
    text,
    icon,
    onClick,
}: {
    text: string;
    icon: any;
    onClick?: () => void;
}) {
    return (
        <div
            onClick={onClick}
            className="flex h-full text-[12px] flex-col items-center justify-center rounded-lg bg-[#282322] py-2 px-3 text-white hover:cursor-pointer hover:bg-opacity-70"
        >
            <div className="flex items-center justify-center">
                {icon}
                <div className="ml-1">{text}</div>
            </div>
            <div>
                <span className="font-black text-white">0</span> /1
            </div>
        </div>
    );
}
export default CustomButton;
