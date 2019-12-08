import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  text: String,
  creator_username: String,
  sent_at: Date,
  group_chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GroupChat',
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const { connection } = mongoose;

export default connection.model('Message', MessageSchema);
