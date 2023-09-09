import { FolderDto } from "../../dtos";
import { FolderEntity } from "../../entities";
import { FolderRepository } from "../../interfaces/repositories/folder.repository";

interface CreateFolderUseCase {
    execute(folderDto: FolderDto): Promise<FolderEntity | undefined>;
}

export class CreateFolder implements CreateFolderUseCase {
    constructor(private readonly folderRepository: FolderRepository) {}

    async execute(folderDto: FolderDto): Promise<FolderEntity | undefined> {
        const folder = await this.folderRepository.createFolder(folderDto);

        return folder;
    }
}
