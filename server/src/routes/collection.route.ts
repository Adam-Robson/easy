import { Router } from 'express';
import { CollectionController } from '../controllers/collection.controller';

const collectionRouter = Router();
const controller = new CollectionController();

collectionRouter.get('/', controller.getAll);
collectionRouter.get('/:id', controller.getById);

export default collectionRouter;
