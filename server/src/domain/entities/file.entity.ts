interface Props {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export class FileEntity {
    public id: string;
    public name: string;

    constructor(props: Props) {
        this.validateProps(props);

        const { id, name } = props;

        this.id = id;
        this.name = name;
    }

    validateProps(props: Props) {
        const { id, name } = props;

        const invalidProps: string[] = [];

        if (!id) {
            invalidProps.push("_id");
        }
        if (!name) {
            invalidProps.push("name");
        }

        if (invalidProps.length > 0) {
            throw new Error(`Invalid props: ${invalidProps.join(", ")}`);
        }
    }
}
