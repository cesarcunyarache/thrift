import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <SignUp  forceRedirectUrl={'/dashboard'}/>
        </div>
    );
}

export default SignUpPage;