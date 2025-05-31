// src/controllers/contacts.controller.ts
import { Request, Response } from 'express';
import { ContactsService } from '../services/contacts.service';

const contactsService = new ContactsService();

export class ContactsController {
  async create(req: Request, res: Response) {
    const contact = await contactsService.create(req.body);
    res.status(201).json({ data: contact });
  }
}
