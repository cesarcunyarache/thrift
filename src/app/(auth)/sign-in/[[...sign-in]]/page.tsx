import { SignIn } from "@clerk/nextjs";

const SingInPage = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <SignIn  forceRedirectUrl={'/dashboard'}/>
        </div>
    );
}

export default SingInPage;