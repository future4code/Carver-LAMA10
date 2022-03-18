import { BandsDataBase } from '../data/BandsDataBase';
import { BaseError } from '../error/BaseError';
import { BandDTO } from '../model/Band';
import { IdGenerator } from '../services/IdGenerator';

export class BandBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private bandDataBase: BandsDataBase
  ) {}
  public async addBand(input: BandDTO) {
    try {
      if (!input.name || !input.genre || !input.responsible) {
        throw new BaseError('Missing input', 422);
      }

      const id = this.idGenerator.generate();

      this.bandDataBase.addBand(id, input.name, input.genre, input.responsible);
      return { message: 'Banda adicionada ao festival!' };
    } catch (error) {
      if (error instanceof BaseError) {
        throw new BaseError(error.message, error.code);
      }
    }
  }
}
