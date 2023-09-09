import DriveProvider from "@/components/drive-provider";
import Folder from "@/components/folder";
import FoldersContainer from "@/components/folders-container";
import StatusBar from "@/components/status-bar";
import { IFolder } from "@/interfaces";
import { fetchServer } from "@/utils/fetch-server";
import { notFound } from "next/navigation";

const FolderPage = async ({ params }: { params: { folderId: string } }) => {
    const { data } = await fetchServer({
        url: `/folder/f/${params.folderId}`,
    });

    const folder: IFolder = data?.data;

    if (!folder) {
        return notFound();
    }

    return (
        <>
            <StatusBar folder={folder} />

            <DriveProvider folderId={folder.id}>
                <h1 className="px-5 font-semibold">Create Folder</h1>

                <FoldersContainer>
                    {folder.folders.map((folder, index) => (
                        <Folder key={index} folder={folder} />
                    ))}
                </FoldersContainer>
            </DriveProvider>
        </>
    );
};

export default FolderPage;
