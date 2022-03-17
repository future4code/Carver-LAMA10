import { User } from '../../src/model/User';
import { adminMock, normalMock } from './UserMock';

export class userDatabaseMock {
  public async createUser(user: User): Promise<void> {}
  public async getUserByEmail(email: string): Promise<User | undefined> {
    if (email === 'admin@email.com') {
      return adminMock;
    } else if (email === 'normal@email.com') {
      return normalMock;
    } else {
      undefined;
    }
  }
}
