import express from 'express';
import cors from 'cors';
import { router } from './routes';
import { initializeCache } from './services/cache';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize routes
app.use('/', router);

// Start server and initialize cache
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  initializeCache(); // Start the cache initialization and update cycle
});