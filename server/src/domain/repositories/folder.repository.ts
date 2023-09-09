import {
    FolderDataSource,
    TreeItem,
} from "../../data/interfaces/folder.datasource";
import { FolderDto } from "../dtos";
import { FolderEntity } from "../entities";
import { FolderRepository } from "../interfaces/repositories/folder.repository";

export class FolderRepositoryImpl implements FolderRepository {
    folderDataSource: FolderDataSource;
    constructor(folderDataSource: FolderDataSource) {
        this.folderDataSource = folderDataSource;
    }

    async createFolder(
        folderDto: FolderDto
    ): Promise<FolderEntity | undefined> {
        const folder = await this.folderDataSource.createFolder(folderDto);

        return folder;
    }

    async getFolder(
        userId: string,
        folderId: string
    ): Promise<FolderEntity | undefined> {
        const folder = await this.folderDataSource.getFolder(userId, folderId);

        return folder;
    }

    async getFolderTree(
        userId: string,
        folderId: string,
        tree: TreeItem[]
    ): Promise<TreeItem[] | undefined> {
        const folderTree = await this.folderDataSource.getFolderTree(
            userId,
            folderId,
            tree
        );

        return folderTree;
    }

    async deleteFolder(
        userId: string,
        folderId: string
    ): Promise<string | undefined> {
        await this.folderDataSource.deleteFolder(userId, folderId);

        return "Folder deleted successfully";
    }

    async getFolders(userId: string): Promise<FolderEntity[] | undefined> {
        const folders = await this.folderDataSource.getFolders(userId);

        return folders;
    }
}
