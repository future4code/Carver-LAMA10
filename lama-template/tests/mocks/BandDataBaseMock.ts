import { Band } from '../../src/model/Band';
import { bandMock } from './BandMock';

export class BandDataBaseMock {
  public async addBand(band: Band): Promise<void> {}
  public async getBandByName(name: string): Promise<Band | undefined> {
    if (name === 'Wu Tang Clan') {
      return bandMock;
    } else {
      undefined;
    }
  }
}
