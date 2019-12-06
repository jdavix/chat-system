import mongoose from 'mongoose';
import configureConnection from '../config/mongodb';

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const connection = configureConnection();

export default connection.model('User', UserSchema);
