"use client";

import { IFolder } from "@/interfaces";
import { axiosClient } from "@/lib/axios";
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@bigcomponents/core";
import {
    FolderIcon,
    MoreVerticalIcon,
    Trash2,
} from "@bigcomponents/core/lucide";
import { useRouter } from "next/navigation";

interface Props {
    folder: IFolder;
}

const Folder = ({ folder }: Props) => {
    const router = useRouter();

    const deleteFolder = async (folderId: string) => {
        try {
            await axiosClient.delete(`/folder/${folderId}`);

            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            onDoubleClick={() => router.push(`/folders/${folder.id}`)}
            className="px-4 py-3 rounded-2xl flex justify-between items-center border hover:bg-muted bg-muted/40"
        >
            <div className="flex flex-1 gap-3 items-center max-w-[120px]">
                <FolderIcon className="h-5 w-5" />

                <div className="truncate flex-1 select-none">{folder.name}</div>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-6 w-6"
                        type="button"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <MoreVerticalIcon className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-[320px]" align="start">
                    <DropdownMenuItem onClick={() => deleteFolder(folder.id)}>
                        <Trash2 className="h-5 w-5 mr-2" />

                        <span>Move to Trash</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default Folder;
