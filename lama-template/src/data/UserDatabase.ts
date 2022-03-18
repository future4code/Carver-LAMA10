import { BaseDatabase } from './BaseDatabase';
import { User } from '../model/User';
import { BaseError } from '../error/BaseError';

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = 'LAMA_Usuarios';

  public async createUser(
    id: string,
    email: string,
    name: string,
    password: string,
    role: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          email,
          name,
          password,
          role,
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error) {
      if (error instanceof BaseError) {
        throw new Error(error.message);
      }
    }
  }

  public async getUserByEmail(email: string): Promise<User> {
    const result = await this.getConnection()
      .select('*')
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

    return User.toUserModel(result[0]);
  }
}
