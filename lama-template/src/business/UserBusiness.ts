import {
  LoginInputDTO,
  stringToUserRole,
  User,
  UserInputDTO,
} from '../model/User';
import { UserDatabase } from '../data/UserDatabase';
import { IdGenerator } from '../services/IdGenerator';
import { HashManager } from '../services/HashManager';
import { Authenticator } from '../services/Authenticator';
import { BaseError } from '../error/BaseError';

export class UserBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private hashGenerator: HashManager,
    private tokenGenerator: Authenticator,
    private userDatabase: UserDatabase
  ) {}
  public async signup(input: UserInputDTO) {
    try {
      if (!input.name || !input.email || !input.password || !input.role) {
        throw new BaseError('Missing input', 422);
      }

      if (input.email.indexOf('@') === -1) {
        throw new BaseError('Invalid email', 422);
      }

      if (input.password.length < 6) {
        throw new BaseError('Invalid password', 422);
      }
      const id = this.idGenerator.generate();

      const cypherPassword = await this.hashGenerator.hash(input.password);
      const role = input.role;

      this.userDatabase.createUser(
        id,
        input.name,
        input.email,
        cypherPassword,
        stringToUserRole(input.role)
      );

      const accessToken = this.tokenGenerator.generateToken({
        id,
        role,
      });
      return { accessToken };
    } catch (error) {
      if (error instanceof BaseError) {
        throw new BaseError(error.message, error.code);
      }
    }
  }

  public async login(email: string, password: string) {
    try {
      if (!email || !password) {
        throw new BaseError('Missing input', 422);
      }
      const user = await this.userDatabase.getUserByEmail(email);

      if (!user) {
        throw new BaseError('Invalid credentials', 401);
      }

      const isPasswordCorrect = await this.hashGenerator.compare(
        password,
        user.getPassword()
      );

      if (!isPasswordCorrect) {
        throw new BaseError('Invalid credentials', 401);
      }

      const accessToken = this.tokenGenerator.generateToken({
        id: user.getId(),
        role: user.getRole(),
      });

      return { accessToken };
    } catch (error) {
      if (error instanceof BaseError) {
        throw new BaseError(error.message, error.code);
      }
    }
  }

  async getUserByEmail(user: LoginInputDTO) {
    const userDatabase = new UserDatabase();
    const userFromDB = await userDatabase.getUserByEmail(user.email);

    const hashManager = new HashManager();
    const hashCompare = await hashManager.compare(
      user.password,
      userFromDB.getPassword()
    );

    const authenticator = new Authenticator();
    const accessToken = authenticator.generateToken({
      id: userFromDB.getId(),
      role: userFromDB.getRole(),
    });

    if (!hashCompare) {
      throw new Error('Invalid Password!');
    }

    return accessToken;
  }
}
