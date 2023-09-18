"use client";

import Image from "next/legacy/image";
import ReactPlayer from "react-player";
import useSWR from "swr";
import { IFile } from "@/interfaces";
import {
    Clapperboard,
    FileIcon,
    FileText,
    ImageIcon,
    Loader2,
    MoreVerticalIcon,
    Trash2,
} from "@bigcomponents/core/lucide";
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    AspectRatio,
    Portal,
} from "@bigcomponents/core";
import { axiosClient } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useDisclosure, useClickOutside } from "@bigcomponents/hooks";
import { useState } from "react";
import { fetcher } from "@/lib/fetchers";

interface Props {
    file: IFile;
}

const File = ({ file }: Props) => {
    const router = useRouter();

    const [opened, handlers] = useDisclosure();

    const [header, setHeader] = useState<HTMLDivElement | null>(null);
    const [content, setContent] = useState<HTMLDivElement | null>(null);

    useClickOutside(() => handlers.close(), null, [header, content]);

    const { data: textFile, isLoading } = useSWR(
        opened && file.type.startsWith("text") ? file.url : null,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    const deleteFile = async (fileId: string) => {
        try {
            await axiosClient.delete(`/file/delete/${fileId}`);

            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            onContextMenu={(e) => {
                e.preventDefault();
            }}
        >
            <div
                onDoubleClick={() => {
                    handlers.open();
                }}
                /* onClick={() => handlers.open()} */
                className="p-2 aspect-square border hover:bg-muted bg-muted/40 rounded-2xl"
            >
                <div className="flex justify-between items-center p-1">
                    <div className="flex gap-3 items-center min-w-[120px]">
                        {file.type.startsWith("image") ? (
                            <ImageIcon className="h-5 w-5" />
                        ) : null}
                        {file.type.startsWith("text") ? (
                            <FileText className="h-5 w-5" />
                        ) : null}
                        {file.type.startsWith("video") ? (
                            <Clapperboard className="h-5 w-5" />
                        ) : null}
                        {file.type.startsWith("application/octet-stream") ? (
                            <FileIcon className="h-5 w-5" />
                        ) : null}

                        <div className="select-none text-sm truncate flex-1">
                            {file.name}
                        </div>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full h-6 w-6"
                                    type="button"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <MoreVerticalIcon className="h-5 w-5" />
                                </Button>
                            </div>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            className="w-[320px]"
                            align="start"
                        >
                            <DropdownMenuItem
                                onClick={() => deleteFile(file.id)}
                            >
                                <Trash2 className="h-5 w-5 mr-2" />

                                <span>Move to Trash</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {file.type.startsWith("image") ? (
                    <div className="w-full h-full mt-1 relative overflow-hidden rounded-md">
                        <Image
                            src={file.url}
                            alt={file.name}
                            blurDataURL={file.url}
                            className="select-none"
                            objectFit="cover"
                            placeholder="blur"
                            layout="fill"
                        />
                    </div>
                ) : null}
                {file.type.startsWith("text") ? (
                    <div className="w-full h-full mt-1 relative overflow-hidden rounded-md flex items-center justify-center">
                        <FileText className="w-1/2 h-1/2 text-primary" />
                    </div>
                ) : null}
                {file.type.startsWith("application/octet-stream") ? (
                    <div className="w-full h-full mt-1 relative overflow-hidden rounded-md flex items-center justify-center">
                        <FileIcon className="w-1/2 h-1/2 text-primary" />
                    </div>
                ) : null}
                {file.type.startsWith("video") ? (
                    <div className="w-full h-full mt-1 relative overflow-hidden rounded-md">
                        {/* <div className="w-full h-full mt-1 relative overflow-hidden rounded-md flex items-center justify-center">
                        <Clapperboard className="w-1/2 h-1/2 text-primary" />
                    </div> */}
                        <Image
                            src={file.thumbnail}
                            alt={file.name}
                            blurDataURL={file.thumbnail}
                            className="select-none"
                            objectFit="cover"
                            placeholder="blur"
                            layout="fill"
                        />
                    </div>
                ) : null}
            </div>

            {opened ? (
                <Portal className="dark:bg-black/50 bg-white/50 backdrop-blur-sm fixed top-0 left-0 bottom-0 right-0">
                    <div className="flex items-center justify-center w-full h-full">
                        <div ref={setHeader}></div>

                        <div
                            ref={setContent}
                            className="w-[1200px] max-h-[700px] flex items-center justify-center"
                        >
                            {file.type.startsWith("image") ? (
                                <AspectRatio ratio={16 / 9}>
                                    <div className="w-full h-full mt-1 relative overflow-hidden rounded-md">
                                        <Image
                                            src={file.url}
                                            alt={file.name}
                                            blurDataURL={file.url}
                                            className="select-none"
                                            objectFit="cover"
                                            placeholder="blur"
                                            layout="fill"
                                        />
                                    </div>
                                </AspectRatio>
                            ) : null}

                            {file.type.startsWith("text") ? (
                                <AspectRatio ratio={16 / 9}>
                                    <div className="w-full h-full flex items-center justify-center overflow-auto bg-background border p-2 rounded-md">
                                        {isLoading ? (
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                        ) : (
                                            <pre className="w-full h-full">
                                                {textFile}
                                            </pre>
                                        )}
                                    </div>
                                </AspectRatio>
                            ) : null}

                            {file.type.startsWith("video") ? (
                                <AspectRatio ratio={16 / 9}>
                                    <ReactPlayer
                                        width="100%"
                                        height="100%"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        url={file.url}
                                        controls
                                    />
                                </AspectRatio>
                            ) : null}

                            {file.type.startsWith(
                                "application/octet-stream"
                            ) ? (
                                <AspectRatio ratio={16 / 9}>
                                    <div className="flex items-center justify-center w-full h-full bg-white border rounded-md">
                                        {isLoading ? (
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                        ) : (
                                            "No preview available"
                                        )}
                                    </div>
                                </AspectRatio>
                            ) : null}
                        </div>
                    </div>
                </Portal>
            ) : null}
        </div>
    );
};

export default File;
