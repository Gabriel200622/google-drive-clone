import { TreeItem } from "../../../data/interfaces";
import { FolderDto } from "../../dtos";
import { FolderEntity } from "../../entities";

export interface FolderRepository {
    getFolders(userId: string): Promise<FolderEntity[] | undefined>;
    createFolder(folderDto: FolderDto): Promise<FolderEntity | undefined>;
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
