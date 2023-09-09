"use client";

import Link from "next/link";
import Logo from "./logo";
import { ModeToggle } from "@bigcomponents/core/next";
import { buttonVariants, cn } from "@bigcomponents/core";

const PublicHeader = () => {
    return (
        <div className="h-[60px] flex items-center justify-between border-b px-2 2xl:px-40">
            <Link href="/">
                <Logo />
            </Link>

            <div className="flex items-center gap-4">
                <ModeToggle />

                <Link
                    className={cn(buttonVariants({ variant: "link" }), "px-0")}
                    href="/auth"
                >
                    Sign in
                </Link>
            </div>
        </div>
    );
};

export default PublicHeader;
