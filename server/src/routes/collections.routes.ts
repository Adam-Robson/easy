import { Router } from 'express';
import { CollectionsController } from '../controllers/collections.controller';
import { asyncHandler } from '../middlewares/asyncHandler';

const router = Router();
const controller = new CollectionsController();

router.get('/', asyncHandler(controller.getAll.bind(controller)));
router.get('/:id', asyncHandler(controller.getById.bind(controller)));

export default router;
