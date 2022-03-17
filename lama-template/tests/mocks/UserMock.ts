import { User, UserRole } from '../../src/model/User';

export const adminMock = new User(
  'id_mockado',
  'Admin',
  'admin@email.com',
  'admin123',
  UserRole.ADMIN
);

export const normalMock = new User(
  'id_mockado_2',
  'Normal',
  'normal@email.com',
  'normal123',
  UserRole.NORMAL
);
