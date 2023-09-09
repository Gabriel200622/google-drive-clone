interface Props {
    id?: string;
    name: string;
    username: string;
    email: string;
    userImageId?: string;
    userImageUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class UserDto {
    name: string;
    username: string;
    email: string;
    userImageUrl?: string;

    constructor(props: Props) {
        const { name, username, email, userImageUrl } = this.validate(props);

        this.name = name;
        this.username = username;
        this.email = email;
        if (userImageUrl) this.userImageUrl = userImageUrl;
    }

    validate(options: Props) {
        if (!options.name) {
            throw new Error("Name is required");
        }
        if (!options.username) {
            throw new Error("Username is required");
        }
        if (!options.email || RegExp("/.+@.+/").test(options.email)) {
            throw new Error("Email is required and must be valid");
        }

        return options;
    }
}
