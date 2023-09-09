import { FolderEntity } from "../../entities";
import { FolderRepository } from "../../interfaces/repositories/folder.repository";

interface GetFolderUseCase {
    execute(
        userId: string,
        folderId: string
    ): Promise<FolderEntity | undefined>;
}

export class GetFolder implements GetFolderUseCase {
    constructor(private readonly folderRepository: FolderRepository) {}

    async execute(
        userId: string,
        folderId: string
    ): Promise<FolderEntity | undefined> {
        const folder = this.folderRepository.getFolder(userId, folderId);

        if (!folder) {
            return undefined;
        }

        return folder;
    }
}
