import Subscription from '../models/Subscription.js';
import User from '../models/user.js'; // Ensure the file name matches your model file
import nodemailer from 'nodemailer';

// Function to upgrade subscription
export const upgradeSubscription = async (req, res) => {
    const { userId, plan } = req.body;
    try {
        // Validate plan
        if (!['Bronze', 'Silver', 'Gold'].includes(plan)) {
            return res.status(400).json({ error: 'Invalid subscription plan' });
        }

        // Find or create subscription
        let subscription = await Subscription.findOne({ userId });
        if (subscription) {
            // Update existing subscription
            subscription.plan = plan;
            subscription.expiryDate = calculateExpiryDate(plan);
        } else {
            // Create new subscription
            subscription = new Subscription({
                userId,
                plan,
                expiryDate: calculateExpiryDate(plan),
            });
        }
        await subscription.save();

        // Fetch user email
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Send email invoice
        await sendInvoice(user.email, plan);

        res.status(200).json({ message: 'Subscription updated successfully' });
    } catch (error) {
        console.error('Error upgrading subscription:', error);
        res.status(400).json({ error: error.message });
    }
};

// Function to calculate expiry date based on the plan
function calculateExpiryDate(plan) {
    const now = new Date();
    switch (plan) {
        case 'Bronze':
        case 'Silver':
            now.setDate(now.getDate() + 30); // Valid for 30 days
            break;
        case 'Gold':
            now.setFullYear(now.getFullYear() + 1); // Valid for 1 year
            break;
        default:
            now.setDate(now.getDate() + 7); // Default to 7 days
            break;
    }
    return now;
}

// Function to send invoice via email
async function sendInvoice(userEmail, plan) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Subscription Invoice',
        text: `Your subscription to the ${plan} plan has been successfully activated.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Invoice email sent to:', userEmail);
    } catch (error) {
        console.error('Error sending invoice email:', error);
    }
}

// Function to get subscription plans
export const getSubscriptionPlans = (req, res) => {
    try {
        const plans = [
            { name: 'Free Plan', time: '5 mins', price: '0' },
            { name: 'Bronze Plan', time: '30 days', price: '10' },
            { name: 'Silver Plan', time: '30 days', price: '50' },
            { name: 'Gold Plan', time: '1 year', price: '100' },
        ];

        // Standardized response
        res.status(200).json({
            success: true,
            data: plans
        });
    } catch (error) {
        console.error('Error fetching subscription plans:', error);

        res.status(500).json({
            success: false,
            message: 'Error fetching subscription plans',
        });
    }
};