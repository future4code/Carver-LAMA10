import express from 'express';
import { BandController } from '../controller/BandController';
import { ShowController } from '../controller/ShowController';

export const bandRouter = express.Router();

const userController = new BandController();

bandRouter.post('/add', userController.addBand);
bandRouter.get('/band', userController.getBandByName);






const showsController = new ShowController()

bandRouter.post('/shows',showsController.addShows);
bandRouter.get('/get', userController.getBandByName);
