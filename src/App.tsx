import React from "react";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./store/AuthContext";
import router from "./router";
import { FocusProvider } from "./store/FocusContext";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <FocusProvider>
                <RouterProvider router={router} />
            </FocusProvider>
        </AuthProvider>
    );
};

export default App;
