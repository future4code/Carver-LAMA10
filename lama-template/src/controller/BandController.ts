import { Request, Response } from 'express';
import { BandBusiness } from '../business/BandBusiness';
import { BandsDataBase } from '../data/BandsDataBase';
import { BaseDatabase } from '../data/BaseDatabase';
import { BandDTO } from '../model/Band';
import { IdGenerator } from '../services/IdGenerator';

const userBusiness = new BandBusiness(new IdGenerator(), new BandsDataBase());

export class UserController {
  async addBand(req: Request, res: Response) {
    try {
      const input: BandDTO = {
        name: req.body.name,
        genre: req.body.genre,
        responsible: req.body.responsible,
      };

      const token = await userBusiness.addBand(input);

      res.status(200).send({ token });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }

    await BaseDatabase.destroyConnection();
  }
}
