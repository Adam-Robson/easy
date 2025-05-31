import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { HttpError } from '../errors/httpError';
import { saveContact } from '../services/contacts';

const router = Router();

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { firstname, lastname, email, message } = req.body;

    if (!firstname || !email || !message) {
      throw new HttpError('Missing required fields', 400);
    }

    await saveContact({ firstname, lastname, email, message });

    res.status(200).json({ message: 'Contact saved successfully' });
  })
);

export default router;
