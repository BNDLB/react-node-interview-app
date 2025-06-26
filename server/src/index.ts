import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import itemsRoutes from './routes/items';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/items', itemsRoutes);

// Health check endpoint
// TODO: remove _req 
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
