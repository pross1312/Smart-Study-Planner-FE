import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import _ from "lodash";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
    email: z
        .string()
        .email("You must enter a valid email")
        .nonempty("You must enter an email"),
});

const defaultValues = {
    email: "",
};

function ForgotPassword() {
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
                <Paper className="min-h-full w-full rounded-0 px-8 py-12 sm:min-h-auto sm:w-auto sm:rounded-2xl sm:p-24 sm:shadow">
                    <div className="mx-auto w-full max-w-320 sm:mx-0 sm:w-320">
                        <p className="mt-12 text-4xl font-extrabold leading-tight tracking-tight">
                            Forgot password?
                        </p>
                        <div className="mt-2 flex items-baseline font-medium">
                            <p>Fill the form to reset your password</p>
                        </div>

                        <form
                            name="registerForm"
                            noValidate
                            className="mt-12 flex w-full flex-col justify-center"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        className="mb-24"
                                        label="Email"
                                        type="email"
                                        error={!!errors.email}
                                        helperText={errors?.email?.message}
                                        variant="outlined"
                                        required
                                        fullWidth
                                    />
                                )}
                            />

                            <Button
                                variant="contained"
                                color="secondary"
                                className="mt-4 w-full"
                                aria-label="Register"
                                disabled={_.isEmpty(dirtyFields) || !isValid}
                                type="submit"
                                size="large"
                            >
                                Send reset link
                            </Button>

                            <p
                                className="mt-12 text-md font-medium"
                                color="text.secondary"
                            >
                                <span>Return to</span>
                                <Link className="ml-2" to="/sign-in">
                                    sign in
                                </Link>
                            </p>
                        </form>
                    </div>
                </Paper>
            </div>
        </div>
    );
}

export default ForgotPassword;
