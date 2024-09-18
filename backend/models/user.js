import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Make sure to import bcrypt

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// Check if the model is already defined
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
