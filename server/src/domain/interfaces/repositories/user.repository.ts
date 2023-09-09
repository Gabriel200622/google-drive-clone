import { UserDto } from "../../dtos";
import { UserEntity } from "../../entities";

export interface UserRepository {
    authGoogle(userDto: UserDto): Promise<UserEntity | undefined>;
    getUserByEmail(email: string): Promise<UserEntity | undefined>;
    getUserByUsername(username: string): Promise<UserEntity | undefined>;
    getUserById(id: string): Promise<UserEntity | undefined>;
}
