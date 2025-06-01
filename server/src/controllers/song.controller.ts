import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import { SongService } from '../services/song.service';

const songService = new SongService();

export class SongController {
  getById = asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid song ID' });
      return;
    }

    const song = await songService.getById(id);
    if (!song) {
      res.status(404).json({ error: 'Song not found' });
      return;
    }

    res.json({ data: song });
  });
}
