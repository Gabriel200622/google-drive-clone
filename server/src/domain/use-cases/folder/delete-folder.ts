import { FolderRepository } from "../../interfaces";

interface DeleteFolderUseCase {
    execute(userId: string, folderId: string): Promise<string | undefined>;
}

export class DeleteFolder implements DeleteFolderUseCase {
    constructor(private readonly folderRepository: FolderRepository) {}

    async execute(
        userId: string,
        folderId: string
    ): Promise<string | undefined> {
        await this.folderRepository.deleteFolder(userId, folderId);

        return "Folder deleted successfully";
    }
}
