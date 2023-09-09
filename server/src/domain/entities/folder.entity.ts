import { UserEntity } from "./user.entity";

interface Props {
    id: string;
    name: string;

    user?: UserEntity;
    userId: string;

    folder?: FolderEntity;
    folderId?: string | null;

    folders?: FolderEntity[];

    createdAt: Date;
    updatedAt: Date;
}

export class FolderEntity {
    public id: string;
    public name: string;

    public user?: UserEntity;
    public userId: string;

    public folder?: FolderEntity;
    public folderId?: string | null;

    public folders?: FolderEntity[];

    public createdAt: Date;
    public updatedAt: Date;

    constructor(props: Props) {
        this.validateProps(props);

        const {
            id,
            name,
            user,
            userId,
            folder,
            folderId,
            folders,
            createdAt,
            updatedAt,
        } = props;

        this.id = id;
        this.name = name;

        this.user = user;
        this.userId = userId;
        this.folders = folders;

        if (folderId) this.folderId = folderId;
        if (folder) this.folder = folder;

        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    validateProps(props: Props) {
        const { id, name, userId } = props;

        const invalidProps: string[] = [];

        if (!id) {
            invalidProps.push("_id");
        }
        if (!name) {
            invalidProps.push("name");
        }
        if (!userId) {
            invalidProps.push("user");
        }

        if (invalidProps.length > 0) {
            throw new Error(`Invalid props: ${invalidProps.join(", ")}`);
        }
    }
}
