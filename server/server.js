
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkWebhooks, stripeWebHooks } from './controllers/webhooks.js';
import educatorRouter from './routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './configs/cloudinary.js';
import courseRouter from './routes/courseRoute.js';
import userRouter from './routes/userRoute.js';

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    // Connect to database
    await connectDB();
    console.log('✅ MongoDB connected');

    await connectCloudinary()

    // Middlewares
    app.use(cors());
    app.use(clerkMiddleware())

    // Routes
    app.get('/', (req, res) => res.send('API Working'));
    
    // Webhook route (uncomment if needed)
    
    // app.use('/api/educator', express.json(), educatorRouter)
    app.post('/clerk', express.json(), clerkWebhooks);
    app.use('/api/educator', educatorRouter)
    app.use('/api/course', express.json(), courseRouter);
    app.use('/api/user', express.json(), userRouter)

    app.post('/stripe', express.raw({type: 'application/json'}), stripeWebHooks)
    

    // Start server
    app.listen(PORT, () => {
      console.log(` Server is running on port ${PORT}`);
    });

  } catch (err) {
    console.error(' Failed to start server:', err);
  }
})();






















