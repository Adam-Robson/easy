import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { HttpError } from '../errors/httpError';

const router = Router();

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { firstname, lastname, email, message } = req.body;

    if (!firstname || !email || !message) {
      throw new HttpError('Missing required fields', 400);
    }

    // simulate db insert...
    res.status(200).json({
      message: 'Contact form received',
      data: { firstname, lastname, email, message },
    });
  })
);

export default router;
