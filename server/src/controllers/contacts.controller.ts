import { Request, Response } from 'express';
import { ContactsService } from '../services/contacts.service';

const contactsService = new ContactsService();

export class ContactsController {
  async create(req: Request, res: Response) {
    try {
      const contact = await contactsService.create(req.body);
      res.status(201).json({ data: contact });
    } catch (err) {
      console.error('Failed to create contact:', err);
      res.status(500).json({ error: 'Failed to save contact' });
    }
  }
}
