import { FolderEntity, UserEntity } from "../entities";

interface Props {
    id?: string;
    name: string;
    user?: UserEntity;
    userId: string;

    folder?: FolderEntity;
    folderId?: string;

    folders?: FolderEntity[];

    createdAt?: Date;
    updatedAt?: Date;
}

export class FolderDto {
    name: string;
    user?: UserEntity;
    userId: string;
    folder?: FolderEntity;
    folderId?: string;

    constructor(props: Props) {
        const { name, user, userId, folderId } = this.validate(props);

        this.name = name;
        this.user = user;
        this.userId = userId;
        if (folderId) this.folderId = folderId;
    }

    validate(options: Props) {
        if (!options.name) {
            throw new Error("Name is required");
        }
        if (!options.userId) {
            throw new Error("UserId is required");
        }

        return options;
    }
}
