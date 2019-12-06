import mongoose from 'mongoose';
import configureConnection from '../config/mongodb';

const GroupChatSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title can't be blank"],
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  // TODO: invitations objects.
  invitations: [Map],
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const connection = configureConnection();

export default connection.model('GroupChat', GroupChatSchema);
