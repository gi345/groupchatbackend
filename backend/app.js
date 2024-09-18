import 'dotenv/config';  // Automatically loads environment variables
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';  // Import CORS middleware

import groupRoutes from './routes/groupRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import themeRoutes from './routes/themeRoutes.js';
import otpRoutes from './routes/otpRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

// Allowed origins for CORS
const allowedOrigins = [
  'https://nullclassintership.netlify.app',  // Your frontend deployment URL (Netlify)
  'http://localhost:3000'                    // Local development URL
];

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      // If origin is allowed or if it's a non-browser request (e.g., mobile apps)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
  credentials: true,  // Allow cookies and credentials (if necessary)
}));

// Middleware to parse incoming request bodies as JSON
app.use(bodyParser.json());

// Root route to check server status
app.get('/', (req, res) => {
  res.send('Server is running and connected to MongoDB');
});

// Routes for your API
app.use('/api/groups', groupRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/themes', themeRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Error handling for CORS issues
app.use((err, req, res, next) => {
  if (err instanceof Error && err.message === 'Not allowed by CORS') {
    res.status(403).json({ message: 'CORS error: Access not allowed from this origin' });
  } else {
    next(err);  // Pass other errors to the default error handler
  }
});

// Start the server on the specified port or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
