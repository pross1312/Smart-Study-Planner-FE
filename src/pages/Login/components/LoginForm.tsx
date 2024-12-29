import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
    TextField,
    Typography,
    CircularProgress,
    Link,
    Switch,
    FormControlLabel,
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
                <div className="-translate-y-1/3">
                    <span className="text-left text-xl font-semibold mb-5">
                        Nice to see you again!
                    </span>

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

                        <div className="flex justify-between select-none">
                            <div>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={rememberMe}
                                            onChange={() =>
                                                setRememberMe(!rememberMe)
                                            }
                                            name="rememberMe"
                                        />
                                    }
                                    label="Remember me"
                                />
                            </div>
                            <Link
                                href="#"
                                onClick={() => navigate("/forgot-password")}
                                className="no-underline text-blue-500 text-center"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                        <CustomButton onClick={handleSubmit}>
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                "Login"
                            )}
                        </CustomButton>
                    </form>

                    <GoogleLoginButton
                        loading={loading}
                        handleGoogleLogin={handleGoogleLogin}
                    />
                    <div style={{ marginTop: "10px", textAlign: "center" }}>
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
            )}
        </>
    );
};

export default LoginForm;
