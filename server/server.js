
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    // Connect to database
    await connectDB();
    console.log('✅ MongoDB connected');

    // Middlewares
    app.use(cors());

    // Routes
    app.get('/', (req, res) => res.send('API Working'));

    // Webhook route (uncomment if needed)
    app.post('/clerk', express.json(), clerkWebhooks);

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });

  } catch (err) {
    console.error('❌ Failed to start server:', err);
  }
})();


