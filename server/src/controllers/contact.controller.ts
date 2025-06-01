import { Request, Response } from 'express';

import { asyncHandler } from '../middlewares/asyncHandler';
import { ContactService } from '../services/contact.service';

const contactService = new ContactService();

export class ContactController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const contact = await contactService.create(req.body);
    res.status(201).json({ data: contact });
  });
}
