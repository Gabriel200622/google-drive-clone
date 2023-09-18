import Logo from "@/components/logo";
import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const { response } = await getCurrentUser();

    if (response?.data) {
        redirect("/drive");
    }

    return (
        <>
            <header className="h-[60px] flex items-center justify-center border-b">
                <Link href="/">
                    <Logo />
                </Link>
            </header>

            <>{children}</>
        </>
    );
};

export default Layout;
