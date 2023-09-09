import Folder from "@/components/folder";
import StatusBar from "@/components/status-bar";
import FoldersContainer from "@/components/folders-container";
import DriveProvider from "@/components/drive-provider";
import { IFolder } from "@/interfaces";
import { fetchServer } from "@/utils/fetch-server";

const DrivePage = async () => {
    const { data } = await fetchServer({ url: "/folder/all" });

    const folders: IFolder[] = data?.data;

    return (
        <>
            <StatusBar />

            <DriveProvider>
                <h1 className="px-5 font-semibold">Create Folder</h1>

                <FoldersContainer>
                    {folders.map((folder, index) => (
                        <Folder key={index} folder={folder} />
                    ))}
                </FoldersContainer>
            </DriveProvider>
        </>
    );
};

export default DrivePage;
