import { Request, Response } from 'express';
import { ShowBusiness } from '../business/ShowBusiness';
import { BaseDatabase } from '../data/BaseDatabase';
import { ShowsDataBase } from '../data/ShowDatabase';
import { ShowDTO } from '../model/Show';
import { IdGenerator } from '../services/IdGenerator';

const showBusiness = new ShowBusiness(new IdGenerator(), new ShowsDataBase());

export class ShowController {
    async addShows(req: Request, res: Response) {
        try {
            const input: ShowDTO = {

                week_day: req.body.week_day,
                start_time: req.body.start_time,
                end_time: req.body.end_time,
                band_id: req.body.band_id
            };


            res.status(200).send({ input });
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }



}
