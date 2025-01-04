import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
    TextField,
    Typography,
    CircularProgress,
    Link,
    Switch,
    FormControlLabel,
    Box,
    Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../store/AuthContext";
import { Navigate } from "react-router-dom";
import auth from "../../../api/auth";
import CustomButton from "../../../component/Button/CustomButton";
import GoogleLoginButton from "../../../component/google";
interface IFormInput {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>();
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const authContext = useAuth();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        setLoading(true);
        const result = await auth.login(data);
        if (result) {
            authContext.setAccessToken(result.data?.token);
            navigate("/home");
        }
        setLoading(false);
    };

    const handleGoogleLogin = async (_response: any) => {
        auth.loginGoogle();
        // const result = await auth.loginGoogle();
        // if (result) {
        //   navigate('/home');
        // }
    };

    return (
        <>
            {authContext.isAuthenticated() ? (
                <Navigate to="/home" replace />
            ) : (
                <div className="w-screen h-screen max-h-screen overflow-hidden flex items-center justify-center">
                    <div className="flex w-full rounded-0 sm:min-h-auto sm:w-auto sm:rounded-2xl sm:shadow md:w-full md:max-w-6xl">
                        <div className="w-full p-8">
                            <p className="text-4xl font-extrabold leading-tight tracking-tight whitespace-nowrap mb-4">
                                Sign in
                            </p>

                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="w-full"
                            >
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Invalid email format",
                                        },
                                    })}
                                    error={!!errors.email}
                                    helperText={
                                        errors.email ? errors.email.message : ""
                                    }
                                />
                                <TextField
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message:
                                                "Password must be at least 6 characters",
                                        },
                                    })}
                                    error={!!errors.password}
                                    helperText={
                                        errors.password
                                            ? errors.password.message
                                            : ""
                                    }
                                />

                                <div className="flex justify-between select-none">
                                    <div>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={rememberMe}
                                                    onChange={() =>
                                                        setRememberMe(
                                                            !rememberMe
                                                        )
                                                    }
                                                    name="rememberMe"
                                                />
                                            }
                                            label="Remember me"
                                        />
                                    </div>
                                    <Link
                                        href="#"
                                        onClick={() =>
                                            navigate("/forgot-password")
                                        }
                                        className="no-underline text-blue-500 text-center"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                                <CustomButton onClick={handleSubmit}>
                                    {loading ? (
                                        <CircularProgress
                                            size={24}
                                            color="inherit"
                                        />
                                    ) : (
                                        "Login"
                                    )}
                                </CustomButton>
                            </form>

                            <GoogleLoginButton
                                loading={loading}
                                handleGoogleLogin={handleGoogleLogin}
                            />
                            <div className="text-center mt-4">
                                <Typography variant="body2">
                                    Don't have an account?{" "}
                                    <Link
                                        href="#"
                                        onClick={() => navigate("/register")}
                                        underline="hover"
                                    >
                                        Register
                                    </Link>
                                </Typography>
                            </div>
                        </div>
                        <div className="relative hidden min-h-full items-center justify-center overflow-hidden p-32 md:flex bg-[#1e293b]">
                            <svg
                                className="pointer-events-none absolute inset-0"
                                viewBox="0 0 960 540"
                                width="100%"
                                height="100%"
                                preserveAspectRatio="xMidYMax slice"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <Box
                                    component="g"
                                    sx={{ color: "primary.light" }}
                                    className="opacity-20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="100"
                                >
                                    <circle r="234" cx="196" cy="23" />
                                    <circle r="234" cx="790" cy="491" />
                                </Box>
                            </svg>
                            <Box
                                component="svg"
                                className="absolute -right-64 -top-64 opacity-20"
                                sx={{ color: "primary.light" }}
                                viewBox="0 0 220 192"
                                width="220px"
                                height="192px"
                                fill="none"
                            >
                                <defs>
                                    <pattern
                                        id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                                        x="0"
                                        y="0"
                                        width="20"
                                        height="20"
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <rect
                                            x="0"
                                            y="0"
                                            width="4"
                                            height="4"
                                            fill="currentColor"
                                        />
                                    </pattern>
                                </defs>
                                <rect
                                    width="220"
                                    height="192"
                                    fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
                                />
                            </Box>
                            <div>
                                <p className="font-bold text-gray-100 leading-none text-5xl">
                                    Welcome Back to
                                </p>
                                <p className="font-bold text-gray-100 leading-none text-5xl whitespace-nowrap mt-2">
                                    your Task Manager
                                </p>
                                <p className="text-gray-400 .tracking-right .leading-6 .text-lg mt-24">
                                    Please log in to access your tasks, manage
                                    your projects, and stay on top of your work.
                                    Enter your credentials below to continue
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LoginForm;
