interface Props {
    id: string;
    name: string;
    url: string;
    key: string;
    type: string;

    thumbnail?: string;
    thumbnailKey?: string;

    createdAt: Date;
    updatedAt: Date;
}

export class FileEntity {
    public id: string;
    public name: string;
    public url: string;
    public thumbnail?: string;
    public type: string;

    constructor(props: Props) {
        this.validateProps(props);

        const { id, name, url, thumbnail, type } = props;

        this.id = id;
        this.name = name;
        this.url = url;
        this.type = type;
        this.thumbnail = thumbnail;
    }

    validateProps(props: Props) {
        const { id, name, url, type, thumbnail } = props;

        const invalidProps: string[] = [];

        if (!id) {
            invalidProps.push("_id");
        }
        if (!name) {
            invalidProps.push("name");
        }
        if (!url) {
            invalidProps.push("url");
        }
        if (!type) {
            invalidProps.push("type");
        }

        if (invalidProps.length > 0) {
            throw new Error(`Invalid props: ${invalidProps.join(", ")}`);
        }
    }
}
