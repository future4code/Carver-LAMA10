import { BaseError } from '../error/BaseError';
import { BaseDatabase } from './BaseDatabase';
import { Show } from "../model/Show"
export class ShowsDataBase extends BaseDatabase {
    private static TABLE_NAME = 'LAMA_Shows';

    public async addShow(

        id: string,
        week_day: string,
        start_time: Number,
        end_time: Number,
        band_id: string


    ): Promise<void> {
        try {
            await this.getConnection()
                .insert({

                    id,
                    week_day,
                    start_time,
                    end_time,
                    band_id

                })
                .into(ShowsDataBase.TABLE_NAME);
        } catch (error) {
            if (error instanceof BaseError) {
                throw new Error(error.message);
            }
        }
    }

    public async seeShowbyId(Id: string): Promise<Show> {
        const result = await this.getConnection()
            .select('*')
            .from(ShowsDataBase.TABLE_NAME)
            .where({ Id });

        return Show.toShowModel(result[0]);
    }
}
