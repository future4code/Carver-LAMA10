import { BandBusiness } from '../src/business/BandBusiness';
import { BaseError } from '../src/error/BaseError';
import { BandDTO } from '../src/model/Band';
import { BandDataBaseMock } from './mocks/BandDataBaseMock';
import { IdGeneratorMock } from './mocks/IdGeneratorMock';

const bandBusinessMock = new BandBusiness(
  new IdGeneratorMock(),
  new BandDataBaseMock() as any
);

describe('Bands business tests', () => {
  test('Should return input error', async () => {
    try {
      const input: BandDTO = {
        name: 'Wu Tang Clan',
        genre: 'rap',
        responsible: '',
      };

      await bandBusinessMock.addBand(input);
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual('Missing input');
        expect(error.code).toBe(422);
      }
    }
  });
});
