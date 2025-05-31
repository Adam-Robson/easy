// src/controllers/collections.controller.ts
import { Request, Response } from 'express';
import { CollectionsService } from '../services/collections.service';

const collectionsService = new CollectionsService();

export class CollectionsController {
  async getAll(req: Request, res: Response) {
    try {
      const collections = await collectionsService.getAll();
      res.json({ data: collections });
    } catch (error) {
      console.error('Error in getAll:', error);
      res.status(500).json({ error: 'Failed to fetch collections' });
    }
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid collection ID' });
    }

    try {
      const collection = await collectionsService.getByIdWithSongs(id);
      if (!collection) {
        return res.status(404).json({ error: 'Collection not found' });
      }
      res.json({ data: collection });
    } catch (error) {
      console.error('Error in getById:', error);
      res.status(500).json({ error: 'Failed to fetch collection' });
    }
  }
}
