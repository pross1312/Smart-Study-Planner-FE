import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
    .object({
        password: z
            .string()
            .nonempty("Please enter your password.")
            .min(8, "Password is too short - should be 8 chars minimum."),
        passwordConfirm: z
            .string()
            .nonempty("Password confirmation is required"),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "Passwords must match",
        path: ["passwordConfirm"],
    });

const defaultValues = {
    password: "",
    passwordConfirm: "",
};

function ResetPassword() {
    const { control, formState, handleSubmit, reset } = useForm({
        mode: "onChange",
        defaultValues,
        resolver: zodResolver(schema),
    });

    const { isValid, dirtyFields, errors } = formState;

    function onSubmit() {
        reset(defaultValues);
    }

    return (
        <div className="w-screen h-screen max-h-[1200px] flex items-center justify-center">
            <div className="flex min-w-0 flex-auto flex-col items-center sm:justify-center">
                <Paper className="min-h-full w-full rounded-0 px-16 py-32 sm:min-h-auto sm:w-auto sm:rounded-2xl sm:p-48 sm:shadow">
                    <div className="mx-auto w-full max-w-320 sm:mx-0 sm:w-320">
                        <Typography className="mt-32 text-4xl font-extrabold leading-tight tracking-tight">
                            Reset your password
                        </Typography>
                        <Typography className="font-medium">
                            Create a new password for your account
                        </Typography>

                        <form
                            name="registerForm"
                            noValidate
                            className="mt-32 flex w-full flex-col justify-center"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        className="mb-24"
                                        label="Password"
                                        type="password"
                                        error={!!errors.password}
                                        helperText={errors?.password?.message}
                                        variant="outlined"
                                        required
                                        fullWidth
                                    />
                                )}
                            />

                            <Controller
                                name="passwordConfirm"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        className="mb-24"
                                        label="Password (Confirm)"
                                        type="password"
                                        error={!!errors.passwordConfirm}
                                        helperText={
                                            errors?.passwordConfirm?.message
                                        }
                                        variant="outlined"
                                        required
                                        fullWidth
                                    />
                                )}
                            />

                            <Button
                                variant="contained"
                                color="secondary"
                                className=" mt-4 w-full"
                                aria-label="Register"
                                disabled={_.isEmpty(dirtyFields) || !isValid}
                                type="submit"
                                size="large"
                            >
                                Reset your password
                            </Button>

                            <Typography
                                className="mt-32 text-md font-medium"
                                color="text.secondary"
                            >
                                <span>Return to</span>
                                <Link className="ml-4" to="/sign-in">
                                    sign in
                                </Link>
                            </Typography>
                        </form>
                    </div>
                </Paper>
            </div>
        </div>
    );
}

export default ResetPassword;
