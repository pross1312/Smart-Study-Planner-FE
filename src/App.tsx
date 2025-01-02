import React from "react";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./store/AuthContext";
import router from "./router";
import { FocusProvider } from "./store/FocusContext";
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <FocusProvider>
                <ToastContainer position="top-right" autoClose={5000} />
                <RouterProvider router={router} />
            </FocusProvider>
        </AuthProvider>
    );
};

export default App;
