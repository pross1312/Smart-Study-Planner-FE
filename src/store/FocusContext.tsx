import React, { createContext, useContext, useState } from "react";

interface FocusContextProps {
    isFocusing: boolean;
    setIsFocusing: (value: boolean) => void;
}

const FocusContext = createContext<FocusContextProps | undefined>(undefined);

export const FocusProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isFocusing, setIsFocusing] = useState(false);

    return (
        <FocusContext.Provider value={{ isFocusing, setIsFocusing }}>
            {children}
        </FocusContext.Provider>
    );
};

export const useFocus = () => {
    const context = useContext(FocusContext);
    if (!context) {
        throw new Error("useFocus must be used within a FocusProvider");
    }
    return context;
};
