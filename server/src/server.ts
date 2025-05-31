import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('Hello from Express + TypeScript + tsx!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
