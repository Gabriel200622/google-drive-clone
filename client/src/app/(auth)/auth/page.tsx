"use client";

import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { Button } from "@bigcomponents/core";

const AuthPage = () => {
    const router = useRouter();

    const login = async () => {
        window.location.href = `http://localhost:4000/api/user/auth/google`;
    };

    return (
        <div className="flex justify-center mt-10">
            <Button
                onClick={login}
                type="button"
                className="rounded-full"
                variant="secondary"
            >
                <FcGoogle className="mr-2 text-2xl" />
                <span className="font-semibold">Continue with Google</span>
            </Button>
        </div>
    );
};

export default AuthPage;
