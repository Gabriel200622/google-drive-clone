import DriveProvider from "@/components/drive-provider";
import File from "@/components/file";
import FilesContainer from "@/components/files-container";
import Folder from "@/components/folder";
import FoldersContainer from "@/components/folders-container";
import StatusBar from "@/components/status-bar";
import { IFile, IFolder } from "@/interfaces";
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

    const { data: filesResponse } = await fetchServer({
        url: `/file/all?folderId=${folder.id}`,
    });

    const files: IFile[] = filesResponse?.data;

    return (
        <>
            <StatusBar folder={folder} />

            <DriveProvider folderId={folder.id}>
                {folder.folders.length ? (
                    <FoldersContainer>
                        {folder.folders.map((folder, index) => (
                            <Folder key={index} folder={folder} />
                        ))}
                    </FoldersContainer>
                ) : null}

                <div className="mt-10"></div>

                {files.length ? (
                    <FilesContainer>
                        {files.map((file, index) => (
                            <File key={index} file={file} />
                        ))}
                    </FilesContainer>
                ) : null}
            </DriveProvider>
        </>
    );
};

export default FolderPage;
