import Subscription from '../models/Subscription.js';
import nodemailer from 'nodemailer';

// Function to upgrade subscription
export const upgradeSubscription = async (req, res) => {
    const { userId, plan } = req.body;
    try {
        const subscription = await Subscription.findOne({ userId });
        if (subscription) {
            subscription.plan = plan;
            subscription.expiryDate = calculateExpiryDate(plan);
            await subscription.save();
        } else {
            const newSubscription = new Subscription({
                userId,
                plan,
                expiryDate: calculateExpiryDate(plan),
            });
            await newSubscription.save();
        }
        await sendInvoice(userId, plan); // Send email invoice
        res.status(200).json({ message: 'Subscription updated' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Function to calculate expiry date based on plan
function calculateExpiryDate(plan) {
    // Example: Calculate expiry based on plan
    // Add your logic here
    return new Date(); // Replace with actual expiry date
}

// Function to send invoice
async function sendInvoice(userId, plan) {
    // Configure your email transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Prepare email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'user@example.com', // Replace with actual user email
        subject: 'Subscription Invoice',
        text: `Your subscription to the ${plan} plan has been activated.`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
}
