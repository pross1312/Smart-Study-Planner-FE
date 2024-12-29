import { twMerge } from "tailwind-merge";

function HeaderButton({
    children,
    isActive,
    onClick,
    stylesActive,
}: {
    children: string;
    isActive: boolean;
    onClick: () => void;
    stylesActive?: string;
}) {
    return (
        <button
            className={twMerge(
                "text-base text-white rounded-md py-1 px-3",
                isActive && `${stylesActive} font-bold`
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default HeaderButton;
