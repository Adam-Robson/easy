import { Router } from 'express';
import { HttpError } from '../errors/httpError';
import { saveContact } from '../services/contacts.service';
import { ContactsController } from '../controllers/contacts.controller';
import { asyncHandler } from '../middlewares/asyncHandler';

const router = Router();
const controller = new ContactsController();
router.post('/', asyncHandler(controller.create.bind(controller)));

export default router;
