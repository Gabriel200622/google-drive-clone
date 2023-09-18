import { FileDto } from "../../dtos";
import { FileEntity } from "../../entities";

export interface FileRepository {
    uploadFile(fileDto: FileDto): Promise<FileEntity | undefined>;
    deleteFile(userId: string, fileId: string): Promise<string | undefined>;
    getFiles(
        userId: string,
        folderId?: string
    ): Promise<FileEntity[] | undefined>;
}
