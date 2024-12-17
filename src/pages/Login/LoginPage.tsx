import AuthImage from "./components/AuthImage";
import LoginForm from "./components/LoginForm";

function LoginPage() {
    return (
        <div className="flex w-full justify-center lg:items-center p-5 gap-16">
            <AuthImage />
            <LoginForm />
        </div>
    );
}

export default LoginPage;
