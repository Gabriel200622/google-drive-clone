import { FileDataSource } from "../../data/interfaces";
import { FileDto } from "../dtos";
import { FileEntity } from "../entities";

export interface FileRepository {
  uploadFile(fileDto: FileDto): Promise<FileEntity | undefined>;
  deleteFile(userId: string, fileId: string): Promise<string | undefined>;
  getFiles(
    userId: string,
    folderId?: string
  ): Promise<FileEntity[] | undefined>;
}

export class FileRepositoryImpl implements FileRepository {
  fileDataSource: FileDataSource;
  constructor(fileDataSource: FileDataSource) {
    this.fileDataSource = fileDataSource;
  }

  async uploadFile(fileDto: FileDto): Promise<FileEntity | undefined> {
    const file = await this.fileDataSource.uploadFile(fileDto);

    return file;
  }

  async getFiles(
    userId: string,
    folderId?: string
  ): Promise<FileEntity[] | undefined> {
    const files = await this.fileDataSource.getFiles(userId, folderId);

    return files;
  }

  async deleteFile(
    userId: string,
    fileId: string
  ): Promise<string | undefined> {
    const response = await this.fileDataSource.deleteFile(userId, fileId);

    return response;
  }
}
