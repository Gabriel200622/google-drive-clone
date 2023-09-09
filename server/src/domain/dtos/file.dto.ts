interface Props {
    id?: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class FileDto {
    name: string;

    constructor(props: Props) {
        const { name } = this.validate(props);

        this.name = name;
    }

    validate(options: Props) {
        if (!options.name) {
            throw new Error("Name is required");
        }

        return options;
    }
}
