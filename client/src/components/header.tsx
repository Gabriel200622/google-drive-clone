import Link from "next/link";
import Logo from "./logo";
import UserButton from "./user-button";
import MenuMobile from "./menu-mobile";
import { ModeToggle } from "@bigcomponents/core/next";

const Header = () => {
    return (
        <div className="border-b h-[60px] flex justify-between sticky top-0 bg-background items-center px-2 2xl:px-20">
            <div className="flex gap-2 items-center">
                <MenuMobile />

                <Link href="/drive">
                    <Logo />
                </Link>
            </div>

            <div className="flex gap-4 items-center">
                <ModeToggle />

                <UserButton />
            </div>
        </div>
    );
};

export default Header;
