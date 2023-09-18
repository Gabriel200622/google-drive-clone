import { FileRepository } from "../../interfaces";

interface DeleteFileUseCase {
    execute(userId: string, fileId: string): Promise<string | undefined>;
}

export class DeleteFile implements DeleteFileUseCase {
    constructor(private readonly fileRepository: FileRepository) {}

    async execute(userId: string, fileId: string): Promise<string | undefined> {
        const response = await this.fileRepository.deleteFile(userId, fileId);

        return response;
    }
}
