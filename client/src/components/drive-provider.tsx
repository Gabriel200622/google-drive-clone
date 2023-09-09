"use client";

import { axiosClient } from "@/lib/axios";
import {
    Button,
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Input,
} from "@bigcomponents/core";
import { FolderPlus, Loader2 } from "@bigcomponents/core/lucide";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDisclosure } from "@bigcomponents/hooks";

interface Props {
    children: React.ReactNode;
    folderId?: string;
}

const DriveProvider = ({ children, folderId }: Props) => {
    const router = useRouter();

    const [opened, handlers] = useDisclosure();
    const [folderName, setFolderName] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);

    const createFolder = async (name: string) => {
        try {
            setLoading(true);

            await axiosClient.post("/folder/create", {
                name,
                folderId: folderId ? folderId : undefined,
            });

            handlers.close();
            router.refresh();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog onOpenChange={handlers.toggle} open={opened}>
            <ContextMenu modal={false}>
                <ContextMenuTrigger>{children}</ContextMenuTrigger>

                <ContextMenuContent>
                    <DialogTrigger>
                        <ContextMenuItem>
                            <FolderPlus className="h-5 w-5 mr-3" />

                            <span>New folder</span>
                        </ContextMenuItem>
                    </DialogTrigger>
                </ContextMenuContent>
            </ContextMenu>

            <DialogContent className="md:w-[330px]">
                <DialogHeader>
                    <DialogTitle>New folder</DialogTitle>
                </DialogHeader>

                <div>
                    <Input
                        onChange={(e) => setFolderName(e.currentTarget.value)}
                        value={folderName}
                    />
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        onClick={() => createFolder(folderName)}
                        className="rounded-full"
                        variant="ghost"
                        size={loading ? "icon" : "default"}
                        disabled={loading || !folderName}
                    >
                        {loading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            "Create"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DriveProvider;
