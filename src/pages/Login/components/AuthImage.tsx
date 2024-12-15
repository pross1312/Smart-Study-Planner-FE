import LoginImg from "@/assets/images/loginImage.png";

const AuthImage = () => {
    return (
        <div className="hidden aspect-square p-6 lg:flex">
            <img
                src={LoginImg}
                alt="Cover Login"
                className="w-[63vw] shrink-0 rounded-xl"
            />
        </div>
    );
};

export default AuthImage;
