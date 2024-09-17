import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';  // Import CORS middleware
import groupRoutes from './routes/groupRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import themeRoutes from './routes/themeRoutes.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config(); 

const app = express();

// CORS configuration
const allowedOrigins = [
  'https://nullclassintership.netlify.app',  // Your frontend deployment URL (Netlify)
  'http://localhost:3000'                    // Local development URL
];

// Configure CORS to allow multiple origins
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) { // Allow requests with no 'origin' header (mobile apps, etc.)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
  credentials: true                           // Allow credentials if needed (cookies, authentication)
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

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server on the port specified in environment variables or default to 5000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
