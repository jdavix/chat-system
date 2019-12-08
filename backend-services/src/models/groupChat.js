import mongoose from 'mongoose';

const GroupChatSchema = new mongoose.Schema({
  chat_type: {
    type: String,
    enum: ['group', 'direct'],
  },
  title: {
    type: String,
    required: [true, "Title can't be blank"],
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  // TODO: invitations objects.
  invitations: [String],
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const { connection } = mongoose;

export default connection.model('GroupChat', GroupChatSchema);
