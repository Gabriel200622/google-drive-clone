import Logo from "@/components/logo";
import Link from "next/link";

const Layout = async ({ children }: { children: React.ReactNode }) => {
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
