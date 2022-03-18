import { UserBusiness } from '../src/business/UserBusiness';
import { BaseError } from '../src/error/BaseError';
import { UserInputDTO } from '../src/model/User';
import { AuthenticatorMock } from './mocks/AuthenticatorMock';
import { HashManagerMock } from './mocks/HashManagerMock';
import { IdGeneratorMock } from './mocks/IdGeneratorMock';
import { userDatabaseMock } from './mocks/UserDataBaseMock';

const userBusinessMock = new UserBusiness(
  new IdGeneratorMock(),
  new HashManagerMock(),
  new AuthenticatorMock(),
  new userDatabaseMock() as any
);

describe('User tests', () => {
  test('Should return signUp error, missing input', async () => {
    expect.assertions;
    try {
      const input: UserInputDTO = {
        name: '',
        email: 'teste@email.com',
        password: '123123123',
        role: 'NORMAL',
      };

      await userBusinessMock.signup(input);
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual('Missing input');
        expect(error.code).toBe(422);
      }
    }
  });
  test('Should return signUp error, invalid password', async () => {
    expect.assertions;
    try {
      const input: UserInputDTO = {
        name: 'teste',
        email: 'teste@email.com',
        password: '12345',
        role: 'NORMAL',
      };

      await userBusinessMock.signup(input);
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual('Invalid password');
        expect(error.code).toBe(422);
      }
    }
  });
  test('Should return signUp error, invalid email', async () => {
    expect.assertions;
    try {
      const input: UserInputDTO = {
        name: 'teste',
        email: 'testeemail.com',
        password: '123123123',
        role: 'NORMAL',
      };

      await userBusinessMock.signup(input);
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual('Invalid email');
        expect(error.code).toBe(422);
      }
    }
  });

  test('Should return success', async () => {
    expect.assertions;
    try {
      const input: UserInputDTO = {
        name: 'teste',
        email: 'teste@email.com',
        password: '123123123',
        role: 'NORMAL',
      };

      const result = await userBusinessMock.signup(input);
      expect(result).toEqual('token_mockado');
    } catch (error) {
      if (error instanceof BaseError) {
        console.log(error);
      }
    }
  });
});
