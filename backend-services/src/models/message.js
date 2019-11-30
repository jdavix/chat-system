import mongoose from 'mongoose';
import configureMongoose from '../config/mongodb';

const MessageSchema = new mongoose.Schema({
  text: String,
  sent_at: Date,
  group_chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GroupChat',
  },
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const connection = configureMongoose();

export default connection.model('Message', MessageSchema);
