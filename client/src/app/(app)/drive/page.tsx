import Folder from "@/components/folder";
import File from "@/components/file";
import StatusBar from "@/components/status-bar";
import DriveProvider from "@/components/drive-provider";
import FoldersContainer from "@/components/folders-container";
import FilesContainer from "@/components/files-container";
import { IFile, IFolder } from "@/interfaces";
import { fetchServer } from "@/utils/fetch-server";

const DrivePage = async () => {
    const { data } = await fetchServer({ url: "/folder/all" });
    const { data: filesResponse } = await fetchServer({ url: "/file/all" });

    const folders: IFolder[] = data?.data;
    const files: IFile[] = filesResponse?.data;

    return (
        <>
            <StatusBar />

            <DriveProvider>
                {folders.length ? (
                    <FoldersContainer>
                        {folders.map((folder, index) => (
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

export default DrivePage;
