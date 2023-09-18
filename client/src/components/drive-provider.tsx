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
    Portal,
    ScrollArea,
} from "@bigcomponents/core";
import { FileUpIcon, FolderPlus, Loader2 } from "@bigcomponents/core/lucide";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useDisclosure } from "@bigcomponents/hooks";
import SelectElements from "./select-elements";

interface Props {
    children: React.ReactNode;
    folderId?: string;
}

const DriveProvider = ({ children, folderId }: Props) => {
    const router = useRouter();

    const inputRef = useRef<HTMLInputElement>(null);

    const [openedFolderDialog, handlersFolderDialog] = useDisclosure();

    const [folderName, setFolderName] = useState<string>("Untitled folder");
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingNewFile, setLoadingNewFile] = useState<boolean>(false);

    const createFolder = async (name: string) => {
        try {
            setLoading(true);

            await axiosClient.post("/folder/create", {
                name,
                folderId: folderId ? folderId : undefined,
            });

            setFolderName("Untitled folder");
            handlersFolderDialog.close();
            router.refresh();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadFile = async (e: any) => {
        const imagesArray: any = Object.values(e.target.files);

        if (!imagesArray.length) return;

        try {
            setLoadingNewFile(true);

            await Promise.all(
                imagesArray.map(async (img: any) => {
                    const file = img;

                    const form = new FormData();

                    form.append("file", file);
                    form.append("folderId", folderId ? folderId : "");

                    await axiosClient.post(
                        `/file/upload`,
                        {
                            file: file,
                            folderId: folderId ? folderId : undefined,
                        },
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    );
                })
            );

            router.refresh();
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingNewFile(false);
        }
    };

    return (
        <>
            <Dialog
                onOpenChange={handlersFolderDialog.toggle}
                open={openedFolderDialog}
            >
                <ContextMenu modal={false}>
                    <ContextMenuTrigger className="h-[calc(95vh-5.7rem)]">
                        <ScrollArea className="h-full px-5">
                            <SelectElements>{children}</SelectElements>
                        </ScrollArea>
                        SelectElements
                    </ContextMenuTrigger>

                    <ContextMenuContent className="flex-col flex">
                        <DialogTrigger>
                            <ContextMenuItem>
                                <FolderPlus className="h-5 w-5 mr-3" />

                                <span>New folder</span>
                            </ContextMenuItem>
                        </DialogTrigger>

                        <ContextMenuItem
                            onClick={() => inputRef.current?.click()}
                        >
                            <FileUpIcon className="h-5 w-5 mr-3" />

                            <span>File upload</span>
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>

                <DialogContent className="md:w-[330px]">
                    <DialogHeader>
                        <DialogTitle>New folder</DialogTitle>
                    </DialogHeader>

                    <div>
                        <Input
                            onChange={(e) =>
                                setFolderName(e.currentTarget.value)
                            }
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

            <input
                ref={inputRef}
                type="file"
                onChange={handleUploadFile}
                hidden
                multiple
            />

            {loadingNewFile && (
                <Portal className="fixed bottom-0 right-10 bg-background p-3 rounded-tr-md rounded-tl-md w-[360px] shadow-md border">
                    Loading...
                </Portal>
            )}
        </>
    );
};

export default DriveProvider;
