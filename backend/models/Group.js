import mongoose from 'mongoose';

const { Schema } = mongoose;

const GroupSchema = new Schema({
    name: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    invitations: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.model('Group', GroupSchema);
