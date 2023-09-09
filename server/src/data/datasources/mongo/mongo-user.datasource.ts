import { db } from "../../../lib";
import { UserDto, UserEntity } from "../../../domain";
import { UserDataSource } from "../../interfaces";

export class MongoUserDataSource implements UserDataSource {
    async create(userDto: UserDto): Promise<UserEntity | undefined> {
        const user = await db.user.create({
            data: userDto,
        });

        const newUser = new UserEntity({
            ...user,
        });

        return newUser;
    }

    async getUserByEmail(email: string): Promise<UserEntity | undefined> {
        const user = await db.user.findFirst({
            where: {
                email,
            },
        });

        if (!user) return undefined;

        const userByEmail = new UserEntity({
            ...user,
        });

        return userByEmail;
    }

    async getUserByUsername(username: string): Promise<UserEntity | undefined> {
        const user = await db.user.findFirst({
            where: {
                username,
            },
        });

        if (!user) return undefined;

        const userByUsername = new UserEntity({
            ...user,
        });

        return userByUsername;
    }

    async getUserById(id: string): Promise<UserEntity | undefined> {
        const user = await db.user.findUnique({
            where: {
                id,
            },
        });

        if (!user) return undefined;

        const userById = new UserEntity({
            ...user,
        });

        return userById;
    }
}
