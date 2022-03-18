import { Request, Response } from 'express';
import { BandBusiness } from '../business/BandBusiness';
import { BandsDataBase } from '../data/BandsDataBase';
import { BaseDatabase } from '../data/BaseDatabase';
import { BandDTO } from '../model/Band';
import { IdGenerator } from '../services/IdGenerator';

const bandBusiness = new BandBusiness(new IdGenerator(), new BandsDataBase());

export class BandController {
  async addBand(req: Request, res: Response) {
    try {
      const input: BandDTO = {
        name: req.body.name,
        genre: req.body.genre,
        responsible: req.body.responsible,
      };

      const token = await bandBusiness.addBand(input);

      res.status(200).send({ token });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }

    await BaseDatabase.destroyConnection();
  }

  async getBandByName(req: Request, res: Response) {
    try {
      const name: string = req.query.name as string;

      const token = await bandBusiness.getBandByName(name);

      res.status(200).send({ token });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
}
