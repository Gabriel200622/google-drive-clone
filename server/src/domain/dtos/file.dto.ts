interface Props {
    id?: string;
    name: string;
    url: string;
    key: string;
    type: string;

    thumbnail?: string;
    thumbnailKey?: string;

    userId: string;
    folderId?: string;

    createdAt?: Date;
    updatedAt?: Date;
}

export class FileDto {
    name: string;
    url: string;
    key: string;
    type: string;

    thumbnail?: string;
    thumbnailKey?: string;

    userId: string;
    folderId?: string;

    constructor(props: Props) {
        const {
            name,
            url,
            key,
            type,
            thumbnail,
            thumbnailKey,
            userId,
            folderId,
        } = this.validate(props);

        this.name = name;
        this.url = url;
        this.key = key;
        this.type = type;

        this.thumbnail = thumbnail;
        this.thumbnailKey = thumbnailKey;

        this.userId = userId;
        this.folderId = folderId;
    }

    validate(options: Props) {
        if (!options.name) {
            throw new Error("Name is required");
        }
        if (!options.url) {
            throw new Error("Url is required");
        }
        if (!options.key) {
            throw new Error("Key is required");
        }
        if (!options.type) {
            throw new Error("Type is required");
        }
        if (!options.userId) {
            throw new Error("UserId is required");
        }

        return options;
    }
}
