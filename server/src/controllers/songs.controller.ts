// src/controllers/songs.controller.ts
import { Request, Response } from 'express';
import { SongsService } from '../services/songs.service';

const songsService = new SongsService();

export class SongsController {
  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid song ID' });
    }

    try {
      const song = await songsService.getById(id);
      if (!song) {
        return res.status(404).json({ error: 'Song not found' });
      }
      res.json({ data: song });
    } catch (error) {
      console.error('Error in getById:', error);
      res.status(500).json({ error: 'Failed to fetch song' });
    }
  }
}
