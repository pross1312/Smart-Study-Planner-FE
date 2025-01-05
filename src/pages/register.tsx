import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
    TextField,
    Button,
    Typography,
    CircularProgress,
    Link,
    Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import auth from "../api/auth";
import { toast } from "react-toastify";

// Define the types for the form data
interface IFormInput {
    email: string;
    password: string;
    confirmPassword: string; // Add the confirm password field
    otp: string;
}

const Register: React.FC = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<IFormInput>();
    const [loading, setLoading] = useState(false); // Loading state
    const [isOpenOTP, setIsOpenOTP] = useState(false); // OTP modal state

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        setLoading(true);
        try {
            if (isOpenOTP) {
                await auth.verifyEmail({ ...data, otp: data.otp });
                toast.success("Registration successful");
                navigate("/login");
            } else {
                await auth.register(data);
                toast.success("OTP sent to your email");
                setIsOpenOTP(true);
            }
        } catch (error: any) {
            toast.error(error.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    // Watch the password field to validate confirm password
    const password = watch("password");

    return (
        <div className="w-screen h-screen max-h-screen overflow-hidden flex items-center justify-center">
            <div className="flex w-full rounded-0 sm:min-h-auto sm:w-auto sm:rounded-2xl sm:shadow md:w-full md:max-w-6xl">
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
                            Please log in to access your tasks, manage your
                            projects, and stay on top of your work. Enter your
                            credentials below to continue
                        </p>
                    </div>
                </div>
                <div className="w-full h-full p-12">
                    <p className="text-4xl font-extrabold leading-tight tracking-tight whitespace-nowrap mb-4">
                        Sign up
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)}>
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

                        {isOpenOTP && (
                            <TextField
                                label="OTP"
                                type="number"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                {...register("otp", {
                                    required: "OTP is required",
                                    pattern: {
                                        value: /^[0-9]{6}$/,
                                        message: "Invalid OTP format",
                                    },
                                })}
                                error={!!errors.otp}
                                helperText={
                                    errors.otp ? errors.otp.message : ""
                                }
                            />
                        )}
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
                                errors.password ? errors.password.message : ""
                            }
                        />
                        <TextField
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) =>
                                    value === password ||
                                    "Passwords do not match",
                            })}
                            error={!!errors.confirmPassword}
                            helperText={
                                errors.confirmPassword
                                    ? errors.confirmPassword.message
                                    : ""
                            }
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={loading}
                            className="mt-4"
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : isOpenOTP ? (
                                "Verify OTP"
                            ) : (
                                "Register"
                            )}
                        </Button>

                        <div
                            style={{
                                marginTop: "10px",
                                textAlign: "center",
                            }}
                        >
                            <Typography variant="body2">
                                Do you have an account?{" "}
                                <Link
                                    href="#"
                                    onClick={() => navigate("/login")}
                                    underline="hover"
                                >
                                    Login
                                </Link>
                            </Typography>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
