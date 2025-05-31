import path from 'node:path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/config';
import contactRoutes from './routes/contacts.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// coors light
app.use(cors({ 
  origin: 'https://lefog.xyz', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}));

// headers
app.use(helmet());

// jason
app.use(express.json());

// static
const publicPath = path.resolve(process.cwd(), 'public');
app.use(express.static(publicPath));

// routes
app.use('/api/contact', contactRoutes);

// global outreach
app.use(errorHandler);

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// fire it up
app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
});
