import React from "react";
import GoogleLogo from "@/assets/images/Other-Pay-Method.png";

interface GoogleLoginProps {
    loading: boolean;
    handleGoogleLogin: (arg: any) => any;
}

const GoogleLoginButton: React.FC<GoogleLoginProps> = ({
    loading,
    handleGoogleLogin,
}) => {
    return (
        <div className="app">
            <button
                onClick={handleGoogleLogin}
                type="submit"
                className={`bg-[#333333] text-white text-lg py-3 px-5 rounded cursor-pointer w-full mt-16 flex justify-center items-center transition-colors duration-300 ${
                    loading ? "bg-gray-300 cursor-not-allowed" : ""
                }`}
                disabled={loading}
            >
                {loading ? (
                    "Logging in..."
                ) : (
                    <div className="flex justify-center items-center">
                        <img
                            src={GoogleLogo}
                            alt="Google Logo"
                            className="mr-3 w-5 h-5"
                        />
                        Login with Google
                    </div>
                )}
            </button>
        </div>
    );
};

export default GoogleLoginButton;
