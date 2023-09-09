import UserButtonMenu from "./user-button-menu";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const UserButton = async () => {
    const { response } = await getCurrentUser();

    const user = response?.data;

    if (!user) {
        redirect("/auth");
    }

    return <UserButtonMenu user={user} />;
};

export default UserButton;
