"use client";

import { Button } from "@bigcomponents/core";
import { Menu } from "@bigcomponents/core/lucide";

const MenuMobile = () => {
    return (
        <Button
            variant="outline"
            className="rounded-full lg:hidden"
            size="icon"
        >
            <Menu className="h-5 w-5" />
        </Button>
    );
};

export default MenuMobile;
