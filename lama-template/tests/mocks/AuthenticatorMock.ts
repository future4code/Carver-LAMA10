import { stringToUserRole, UserRole } from '../../src/model/User';
import { AuthenticationData } from '../../src/services/Authenticator';

export class AuthenticatorMock {
  public generateToken(
    input: AuthenticationData,
    expiresIn: string = process.env.ACCESS_TOKEN_EXPIRES_IN!
  ): string {
    return 'token_mockado';
  }

  public getData(token: string): AuthenticationData {
    return {
      id: 'id_mockado',
      role: stringToUserRole('ADMIN'),
    };
  }
}
