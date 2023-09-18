import { FileDto, FileEntity } from "../../domain";

export interface FileDataSource {
    uploadFile(fileDto: FileDto): Promise<FileEntity | undefined>;
    deleteFile(userId: string, fileId: string): Promise<string | undefined>;
    getFiles(
        userId: string,
        folderId?: string
    ): Promise<FileEntity[] | undefined>;
}
