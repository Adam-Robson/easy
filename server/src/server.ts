import express from 'express';
import { config } from './config/config';
import contactRoutes from './routes/contact';

const app = express();

app.use(express.json());
app.use('/api/contact', contactRoutes);

app.get('/', (_req, res) => {
  res.send('Welcome to the Express + TypeScript server!');
});

app.listen(config.port, () => {
  console.log(`Server running at ${config.dbHost}:${config.port}`);
});
