import { Router } from 'express';
import { HttpError } from '../errors/httpError';
import { ContactController } from '../controllers/contact.controller';

const contactRouter = Router();
const controller = new ContactController();

contactRouter.post('/', controller.create);

export default contactRouter;
