import { ShowsDataBase } from '../data/ShowDatabase';
import { BaseError } from '../error/BaseError';
import { ShowDTO } from '../model/Show';
import { IdGenerator } from '../services/IdGenerator';

export class ShowBusiness {
    constructor(
        private idGenerator: IdGenerator,
        private ShowsDataBase: ShowsDataBase
    ) { }
    public async addShow(input: ShowDTO) {
        try {
            if (!input.week_day || !input.start_time || !input.end_time) {
                throw new BaseError('Missing input', 422);
            }

            const id = this.idGenerator.generate();

            this.ShowsDataBase.addShow(
                id,
                input.week_day,
                input.start_time,
                input.end_time,
                input.band_id

            );
            return { message: 'Show adicionado!' };
        } catch (error) {
            if (error instanceof BaseError) {
                throw new BaseError(error.message, error.code);
            }
        }
    }

    async seeShowById(Id: string) {
        const bandFromDB = await this.ShowsDataBase.seeShowbyId(Id);

        if (!Id) {
            throw new BaseError('Missing input', 422);
        }

        return bandFromDB;
    }
}
