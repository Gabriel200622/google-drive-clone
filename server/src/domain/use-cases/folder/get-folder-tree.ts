import { TreeItem } from "../../../data/interfaces";
import { FolderRepository } from "../../interfaces/repositories/folder.repository";

interface GetFolderTreeUseCase {
    execute(
        userId: string,
        folderId: string,
        tree: TreeItem[]
    ): Promise<TreeItem[] | undefined>;
}

export class GetFolderTree implements GetFolderTreeUseCase {
    constructor(private readonly folderRepository: FolderRepository) {}

    async execute(
        userId: string,
        folderId: string,
        tree: TreeItem[]
    ): Promise<TreeItem[] | undefined> {
        const folderTree = await this.folderRepository.getFolderTree(
            userId,
            folderId,
            tree
        );

        return folderTree;
    }
}
