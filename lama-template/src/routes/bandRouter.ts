import express from 'express';
import { BandController } from '../controller/BandController';

export const bandRouter = express.Router();

const userController = new BandController();

bandRouter.post('/add', userController.addBand);
bandRouter.get('/get', userController.getBandByName);
