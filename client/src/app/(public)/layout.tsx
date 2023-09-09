import PublicHeader from "@/components/public-header";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const { response } = await getCurrentUser();

    if (response?.data) {
        redirect("/drive");
    }

    return (
        <>
            <PublicHeader />

            <>{children}</>
        </>
    );
};

export default Layout;
