interface Props {
    id: string;
    name: string;
    username: string;
    email: string;
    userImageId: string | null;
    userImageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export class UserEntity {
    public id: string;
    public name: string;
    public username: string;
    public email: string;
    public userImageId: string | null;
    public userImageUrl: string | null;

    constructor(props: Props) {
        this.validateProps(props);

        const { id, name, username, email, userImageId, userImageUrl } = props;

        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.userImageId = userImageId;
        this.userImageUrl = userImageUrl;
    }

    validateProps(props: Props) {
        const { id, name, username, email, createdAt, updatedAt } = props;

        const invalidProps: string[] = [];

        if (!id) {
            invalidProps.push("_id");
        }
        if (!name) {
            invalidProps.push("name");
        }
        if (!username) {
            invalidProps.push("username");
        }
        if (!email) {
            invalidProps.push("email");
        }

        if (!createdAt) {
            invalidProps.push("createdAt");
        }
        if (!updatedAt) {
            invalidProps.push("updatedAt");
        }

        if (invalidProps.length > 0) {
            throw new Error(`Invalid props: ${invalidProps.join(", ")}`);
        }
    }
}
