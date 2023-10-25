import { UserDataSource } from "../../data/interfaces";
import { UserDto } from "../dtos";
import { UserEntity } from "../entities";

export interface UserRepository {
  authGoogle(userDto: UserDto): Promise<UserEntity | undefined>;
  getUserByEmail(email: string): Promise<UserEntity | undefined>;
  getUserByUsername(username: string): Promise<UserEntity | undefined>;
  getUserById(id: string): Promise<UserEntity | undefined>;
}

export class UserRepositoryImpl implements UserRepository {
  userDataSource: UserDataSource;
  constructor(userDataSource: UserDataSource) {
    this.userDataSource = userDataSource;
  }

  async authGoogle(userDto: UserDto): Promise<UserEntity | undefined> {
    const user = await this.userDataSource.create(userDto);
    return user;
  }

  async getUserByEmail(email: string): Promise<UserEntity | undefined> {
    const user = await this.userDataSource.getUserByEmail(email);

    return user;
  }

  async getUserByUsername(username: string): Promise<UserEntity | undefined> {
    const user = await this.userDataSource.getUserByUsername(username);

    return user;
  }

  async getUserById(id: string): Promise<UserEntity | undefined> {
    const user = await this.userDataSource.getUserById(id);

    return user;
  }
}
