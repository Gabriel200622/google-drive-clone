import { UserEntity } from "../../entities";
import { UserRepository } from "../../interfaces";

interface ProfileUseCase {
    execute(id: string): Promise<UserEntity | undefined>;
}

export class Profile implements ProfileUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(id: string): Promise<UserEntity | undefined> {
        const user = await this.userRepository.getUserById(id);

        return user;
    }
}
