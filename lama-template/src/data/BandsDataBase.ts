import { BaseError } from '../error/BaseError';
import { Band } from '../model/Band';
import { BaseDatabase } from './BaseDatabase';

export class BandsDataBase extends BaseDatabase {
  private static TABLE_NAME = 'LAMA_Bandas';

  public async addBand(
    id: string,
    name: string,
    music_genre: string,
    responsible: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          name,
          music_genre,
          responsible,
        })
        .into(BandsDataBase.TABLE_NAME);
    } catch (error) {
      if (error instanceof BaseError) {
        throw new Error(error.message);
      }
    }
  }

  public async getBand(name: string): Promise<Band> {
    const result = await this.getConnection()
      .select('*')
      .from(BandsDataBase.TABLE_NAME)
      .where({ name });

    return Band.toBandModel(result[0]);
  }
}
