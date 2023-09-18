import Header from "@/components/header";
import { getCurrentUser } from "@/lib/session";
import { ScrollArea } from "@bigcomponents/core";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const { response } = await getCurrentUser();

    if (!response?.data) {
        redirect("/auth");
    }

    return (
        <div className="flex flex-col min-h-screen relative">
            <Header />

            <div className="flex-1 flex flex-row">
                <div className="h-[calc(100vh-4.5rem)] w-[250px] sticky top-[60px] hidden md:block bg-secondary">
                    <ScrollArea className="h-full p-2">Sidebar</ScrollArea>
                </div>

                <div className="flex-1 flex flex-col">{children}</div>
            </div>
        </div>
    );
};

export default Layout;
