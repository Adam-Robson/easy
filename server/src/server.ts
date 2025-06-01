import path from 'node:path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/config';
import contactRoutes from './routes/contact.route';
import songsRoutes from './routes/song.route';
import collectionsRoutes from './routes/collection.route';
import { errorHandler } from './middlewares/errorHandler';
import favicon from 'serve-favicon';

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




// Serve favicon from /public/favicon
app.use(
  favicon(path.join(__dirname, '..', 'public', 'favicon', 'favicon.ico'))
);

// Serve the rest of the static assets
app.use(express.static(path.join(__dirname, '..', 'public')));

// static
const publicPath = path.resolve(process.cwd(), 'public');
app.use(express.static(publicPath));

// routes
app.use('/api/songs', songsRoutes)
app.use('/api/contact', contactRoutes);
app.use('/api/collections', collectionsRoutes);

// global outreach
app.use(errorHandler);

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// fire it up
app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
});
