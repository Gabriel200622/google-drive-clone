import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { axiosClient } from "@/lib/axios";

async function logout(url: string) {
    await axiosClient.get(url);
}

export const useLogout = () => {
    const router = useRouter();
    const { trigger, isMutating } = useSWRMutation(
        "/user/auth/logout ",
        logout
    );

    const handleLogout = async () => {
        await trigger();

        router.refresh();
    };

    return { handleLogout, isMutating };
};
