import { FileDto, FileEntity } from "../../../domain";
import { db, deleteFile } from "../../../lib";
import { FileDataSource } from "../../interfaces";

export class MongoFileDataSource implements FileDataSource {
  async uploadFile(fileDto: FileDto): Promise<FileEntity | undefined> {
    const { name, url, key, type, thumbnail, thumbnailKey, userId, folderId } =
      fileDto;

    const file = await db.file.create({
      data: {
        name,
        url,
        key,
        type,
        thumbnail,
        thumbnailKey,
        user: { connect: { id: userId } },
        folder: folderId ? { connect: { id: folderId } } : undefined,
      },
    });

    const newFile = new FileEntity({
      ...file,
      thumbnail: file.thumbnail ? file.thumbnail : undefined,
      thumbnailKey: file.thumbnailKey ? file.thumbnailKey : undefined,
    });

    return newFile;
  }

  async deleteFile(
    userId: string,
    fileId: string
  ): Promise<string | undefined> {
    const file = await db.file.findUnique({
      where: {
        id: fileId,
        userId: userId,
      },
    });

    if (!file) return "File not found";

    // Delete file from AWS S3
    await deleteFile(file.key);
    // Delete thumbnail from AWS S3
    if (file.thumbnailKey) await deleteFile(file.thumbnailKey);

    await db.file.delete({ where: { id: file.id } });

    return "File deleted successfully";
  }

  async getFiles(
    userId: string,
    folderId?: string
  ): Promise<FileEntity[] | undefined> {
    const filesMongo = await db.file.findMany({
      where: {
        userId,
        folderId: folderId ? folderId : { isSet: false },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const files = filesMongo.map(
      (file) =>
        new FileEntity({
          ...file,
          thumbnail: file.thumbnail ? file.thumbnail : undefined,
          thumbnailKey: file.thumbnailKey ? file.thumbnailKey : undefined,
        })
    );

    return files;
  }
}
