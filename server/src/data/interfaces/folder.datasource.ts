import { FolderDto, FolderEntity } from "../../domain";

export interface TreeItem {
    id: string;
    name: string;
}

export interface FolderDataSource {
    /* Create a folder */
    createFolder(folderDto: FolderDto): Promise<FolderEntity | undefined>;

    getFolders(userId: string): Promise<FolderEntity[] | undefined>;
    deleteFolder(userId: string, folderId: string): Promise<string | undefined>;
    getFolder(
        userId: string,
        folderId: string
    ): Promise<FolderEntity | undefined>;

    getFolderTree(
        userId: string,
        folderId: string,
        tree: TreeItem[]
    ): Promise<TreeItem[] | undefined>;
}
