import User from '../models/user.js'; // Ensure the file extension is included
import bcrypt from 'bcryptjs';
import { sendOTP } from './otpController.js'; // Ensure the file extension is included

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate OTP and trigger OTP flow
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

    const location = req.body.location; // Location (state) passed from frontend
    await sendOTP({ body: { email: user.email, phone: user.phone, location, otp } }, res);

  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err });
  }
};

