function CustomButton({ styles, onClick, children }: any) {
    return (
        <button
            onClick={onClick}
            type="submit"
            className={`bg-[#007AFF] text-white text-lg py-3 px-5 rounded cursor-pointer w-full mt-8 flex justify-center items-center transition-colors duration-300 ${styles}`}
        >
            {children}
        </button>
    );
}

export default CustomButton;
