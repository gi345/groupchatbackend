import moment from 'moment-timezone';
import nodemailer from 'nodemailer';
import twilio from 'twilio';

const SOUTH_INDIAN_STATES = ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra', 'Telangana'];

// Get theme based on login time and location
export const getTheme = (req, res) => {
    const { location } = req.query;
    const currentTime = moment().tz('Asia/Kolkata').format('HH:mm');
    const theme = (currentTime >= '10:00' && currentTime <= '12:00' && SOUTH_INDIAN_STATES.includes(location))
        ? 'white'
        : 'dark';
    res.status(200).json({ theme });
};

// Send OTP based on location
export const sendOtp = async (req, res) => {
    const { location, email, phone } = req.body;
    const otp = generateOtp();

    if (SOUTH_INDIAN_STATES.includes(location)) {
        await sendEmailOtp(email, otp);
    } else {
        await sendSmsOtp(phone, otp);
    }

    res.status(200).json({ message: 'OTP sent' });
};

// Generate OTP
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP via email
async function sendEmailOtp(email, otp) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
    };

    await transporter.sendMail(mailOptions);
}

// Send OTP via SMS
async function sendSmsOtp(phone, otp) {
    const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

    await client.messages.create({
        body: `Your OTP code is ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone,
    });
}

