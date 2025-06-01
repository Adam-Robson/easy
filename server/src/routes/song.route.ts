import { Router } from 'express';
import { SongController } from '../controllers/song.controller';

const router = Router();
const controller = new SongController();

router.get('/:id', controller.getById); // no need to wrap with asyncHandler

export default router;
