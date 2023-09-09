import Link from "next/link";
import Logo from "./logo";
import UserButton from "./user-button";
import { ModeToggle } from "@bigcomponents/core/next";

const Header = () => {
    return (
        <div className="border-b h-[60px] flex justify-between items-center px-2 2xl:px-20">
            <Link href="/drive">
                <Logo />
            </Link>

            <div className="flex gap-4 items-center">
                <ModeToggle />

                <UserButton />
            </div>
        </div>
    );
};

export default Header;
