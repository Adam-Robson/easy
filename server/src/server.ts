import express from 'express';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Built-in middleware
app.use(express.json());

// Mount routes
app.use('/api/contact', contactRoutes);

app.get('/', (_req, res) => {
  res.send('Welcome to the Express + TypeScript server!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
