import { Router } from 'express';
import { SongsController } from '../controllers/songs.controller';
import { asyncHandler } from '../middlewares/asyncHandler';

const router = Router();
const controller = new SongsController();

router.get('/:id', asyncHandler(controller.getById.bind(controller)));

export default router;
