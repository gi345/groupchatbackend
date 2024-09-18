import nodemailer from 'nodemailer';
import twilio from 'twilio';

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !twilioPhoneNumber) {
  throw new Error('Twilio environment variables are missing.');
}

const client = twilio(accountSid, authToken);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error('Email environment variables are missing.');
}

export const sendOTP = async (req, res) => {
  const { email, phone, location, otp } = req.body;
  const southernStates = ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana'];

  try {
    if (southernStates.includes(location.state)) {
      // Send OTP via email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP is: ${otp}`,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'OTP sent via email' });
    } else {
      // Send OTP via SMS
      await client.messages.create({
        body: `Your OTP is: ${otp}`,
        from: twilioPhoneNumber,
        to: phone,
      });
      res.status(200).json({ message: 'OTP sent via SMS' });
    }
  } catch (err) {
    console.error('Error sending OTP:', err); // Add more detailed logging
    res.status(500).json({ message: 'Error sending OTP', error: err.message });
  }
};

