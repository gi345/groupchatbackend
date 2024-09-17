import mongoose from 'mongoose';

const { Schema } = mongoose;

const SubscriptionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    plan: { type: String, enum: ['Free', 'Bronze', 'Silver', 'Gold'], required: true },
    expiryDate: { type: Date },
});

export default mongoose.model('Subscription', SubscriptionSchema);
