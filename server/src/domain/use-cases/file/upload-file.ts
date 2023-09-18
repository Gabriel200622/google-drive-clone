import { FileDto } from "../../dtos";
import { FileEntity } from "../../entities";
import { FileRepository } from "../../interfaces";

interface UploadFileUseCase {
    execute(fileDto: FileDto): Promise<FileEntity | undefined>;
}

export class UploadFile implements UploadFileUseCase {
    constructor(private readonly fileRepository: FileRepository) {}

    async execute(fileDto: FileDto): Promise<FileEntity | undefined> {
        const file = this.fileRepository.uploadFile(fileDto);

        return file;
    }
}
