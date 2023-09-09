import Header from "@/components/header";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const { response } = await getCurrentUser();

    if (!response?.data) {
        redirect("/auth");
    }

    return (
        <div className="flex flex-col min-h-screen relative">
            <Header />

            <div className="flex-1 flex">
                <div className="w-[250px] hidden lg:block bg-secondary">
                    Sidebar
                </div>

                <div className="flex-1">{children}</div>
            </div>
        </div>
    );
};

export default Layout;
