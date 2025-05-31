import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  const { firstname, lastname, email, message } = req.body;

  // For now, just echo the data back
  res.status(200).json({
    message: 'Contact form received',
    data: { firstname, lastname, email, message },
  });
});

export default router;
