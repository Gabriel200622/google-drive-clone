"use client";

import Image from "next/image";
import { IUser } from "@/interfaces";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    Button,
} from "@bigcomponents/core";
import { XIcon } from "@bigcomponents/core/lucide";
import { useDisclosure } from "@bigcomponents/hooks";
import { useLogout } from "@/hooks/useLogout";

const UserButtonMenu = ({ user }: { user: IUser }) => {
    const [opened, handlers] = useDisclosure(false);

    const { handleLogout } = useLogout();

    return (
        <DropdownMenu onOpenChange={handlers.toggle} open={opened}>
            <DropdownMenuTrigger>
                <div className="h-10 w-10 relative rounded-full overflow-hidden">
                    <Image src={user.userImageUrl} alt={user.name} fill />
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-[430px] relative rounded-2xl"
            >
                <div className="flex justify-center p-4">
                    <span>{user.email}</span>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full absolute top-3 right-3"
                        type="button"
                        onClick={() => handlers.close()}
                    >
                        <XIcon className="h-6 w-6" />
                    </Button>
                </div>

                <div className="flex justify-center p-4">
                    <Button onClick={handleLogout}>Log out</Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserButtonMenu;
