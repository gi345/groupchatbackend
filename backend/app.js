import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import groupRoutes from './routes/groupRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import themeRoutes from './routes/themeRoutes.js';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
app.use(bodyParser.json());

// Root route to check if server is running
app.get('/', (req, res) => {
    res.send('Server is running and connected to MongoDB');
});

// Use routes
app.use('/groups', groupRoutes);
app.use('/subscriptions', subscriptionRoutes);
app.use('/themes', themeRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
