import mongoose from 'mongoose';
import configureMongoose from '../config/mongodb';

const GroupChatSchema = new mongoose.Schema({
  title: String,
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const connection = configureMongoose();

export default connection.model('GroupChat', GroupChatSchema);
