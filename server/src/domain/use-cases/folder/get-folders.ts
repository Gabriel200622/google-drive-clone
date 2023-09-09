import { FolderEntity } from "../../entities";
import { FolderRepository } from "../../interfaces/repositories/folder.repository";

interface GetFoldersUseCase {
    execute(userId: string): Promise<FolderEntity[] | undefined>;
}

export class GetFolders implements GetFoldersUseCase {
    constructor(private readonly folderRepository: FolderRepository) {}

    async execute(userId: string): Promise<FolderEntity[] | undefined> {
        const folders = await this.folderRepository.getFolders(userId);

        return folders;
    }
}
