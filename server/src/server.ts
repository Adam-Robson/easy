import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/config';
import contactRoutes from './routes/contact';

const app = express();

// cors
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

// headers
app.use(helmet());

// jason
app.use(express.json());

// routes
app.use('/api/contact', contactRoutes);

app.get('/', (_req, res) => {
  res.send('This is an express & typescript server + tsx.');
});

app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
});
