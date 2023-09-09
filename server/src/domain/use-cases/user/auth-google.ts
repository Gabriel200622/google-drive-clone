import { UserDto } from "../../dtos";
import { UserEntity } from "../../entities";
import { UserRepository } from "../../interfaces";

interface AuthGoogleUseCase {
    execute(user: UserDto): Promise<UserEntity | undefined>;
}

export class AuthGoogle implements AuthGoogleUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(userDto: UserDto): Promise<UserEntity | undefined> {
        const usernameExists = await this.userRepository.getUserByUsername(
            userDto.username
        );
        const emailExists = await this.userRepository.getUserByEmail(
            userDto.email
        );

        if (usernameExists) {
            return usernameExists;
        }
        if (emailExists) {
            return emailExists;
        }

        const user = await this.userRepository.authGoogle(userDto);

        return user;
    }
}
