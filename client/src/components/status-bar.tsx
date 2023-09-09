"use client";

import Link from "next/link";
import { axiosClient } from "@/lib/axios";
import { ChevronRight } from "@bigcomponents/core/lucide";
import { useEffect } from "react";
import { IFolder } from "@/interfaces";
import { useDriveStore } from "@/store/drive-store";

const StatusBar = ({ folder }: { folder?: IFolder }) => {
    const { setTree, tree } = useDriveStore();

    useEffect(() => {
        if (folder) {
            const getTree = async () => {
                const { data } = await axiosClient(`/folder/tree/${folder.id}`);

                const newArray = [
                    ...data.data,
                    {
                        id: folder.id,
                        name: folder.name,
                    },
                ];

                setTree(newArray);
            };

            getTree();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [folder]);

    return (
        <div className="p-5 flex items-center gap-3">
            <Link href="/drive" className="text-xl">
                My Drive
            </Link>

            {folder ? (
                <>
                    {tree.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <ChevronRight className="h-7 w-7" />

                            <Link
                                href={`/folders/${item.id}`}
                                className="text-lg"
                            >
                                {item.name}
                            </Link>
                        </div>
                    ))}
                </>
            ) : null}
        </div>
    );
};

export default StatusBar;
