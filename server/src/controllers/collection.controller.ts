import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import { CollectionService } from '../services/collection.service';

const collectionService = new CollectionService();

export class CollectionController {
  getAll = asyncHandler(async (req: Request, res: Response) => {
    const collections = await collectionService.getAll();
    res.json({ data: collections });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid collection ID' });
      return;
    }

    const collection = await collectionService.getByIdWithSongs(id);
    if (!collection) {
      res.status(404).json({ error: 'Collection not found' });
      return;
    }

    res.json({ data: collection });
  });
}
