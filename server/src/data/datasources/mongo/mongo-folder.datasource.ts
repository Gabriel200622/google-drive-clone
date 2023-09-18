import { FolderDto, FolderEntity } from "../../../domain";
import { db, deleteFile } from "../../../lib";
import { FolderDataSource, TreeItem } from "../../interfaces";

export class MongoFolderDataSource implements FolderDataSource {
    async createFolder(
        folderDto: FolderDto
    ): Promise<FolderEntity | undefined> {
        const folder = await db.folder.create({
            data: {
                name: folderDto.name,
                user: { connect: { id: folderDto.userId } },
                folder: folderDto.folderId
                    ? { connect: { id: folderDto.folderId } }
                    : undefined,
            },
        });

        const newFolder = new FolderEntity({
            ...folder,
        });

        return newFolder;
    }

    async getFolder(
        userId: string,
        folderId: string
    ): Promise<FolderEntity | undefined> {
        const folderMongo = await db.folder.findUnique({
            where: {
                id: folderId,
                userId: userId,
            },
            include: {
                folders: {
                    orderBy: { createdAt: "desc" },
                },
            },
        });

        if (!folderMongo) return undefined;

        const subFolders = folderMongo.folders.map(
            (sub) => new FolderEntity({ ...sub })
        );

        const folder = new FolderEntity({
            ...folderMongo,
            folders: subFolders,
        });

        return folder;
    }

    async getFolderTree(
        userId: string,
        folderId: string,
        tree: TreeItem[]
    ): Promise<TreeItem[] | undefined> {
        const folder = await db.folder.findUnique({
            where: {
                id: folderId,
                userId: userId,
            },
        });

        if (!folder) return undefined;

        if (!folder.folderId) {
            return tree;
        } else {
            const parent = await db.folder.findUnique({
                where: {
                    id: folder.folderId,
                    userId: userId,
                },
            });

            if (parent) {
                tree.unshift({
                    id: parent.id,
                    name: parent.name,
                });

                return this.getFolderTree(userId, parent.id, tree);
            }
        }
    }

    async deleteFolder(
        userId: string,
        folderId: string
    ): Promise<string | undefined> {
        const folder = await db.folder.findUnique({
            where: {
                id: folderId,
                userId: userId,
            },
            include: {
                folders: true,
                files: true,
            },
        });

        if (!folder) return undefined;

        for (const subFolder of folder.folders) {
            await this.deleteFolder(userId, subFolder.id);
        }
        for (const subFile of folder.files) {
            await this.deleteFile(userId, subFile.id);
        }

        await db.folder.delete({
            where: {
                id: folderId,
                userId: userId,
            },
        });

        return "Folder deleted successfully";
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

    async getFolders(userId: string): Promise<FolderEntity[] | undefined> {
        const foldersMongo = await db.folder.findMany({
            where: {
                userId,
                folderId: { isSet: false },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const folders = foldersMongo.map((folder) => {
            return new FolderEntity({ ...folder });
        });

        return folders;
    }
}
