import { FileEntity } from "../../entities";
import { FileRepository } from "../../interfaces";

interface GetFilesUseCase {
    execute(
        userId: string,
        folderId?: string
    ): Promise<FileEntity[] | undefined>;
}

export class GetFiles implements GetFilesUseCase {
    constructor(private readonly fileRepository: FileRepository) {}

    async execute(
        userId: string,
        folderId?: string
    ): Promise<FileEntity[] | undefined> {
        const files = await this.fileRepository.getFiles(userId, folderId);

        return files;
    }
}
