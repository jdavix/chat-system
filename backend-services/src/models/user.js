import mongoose from 'mongoose';
import configureMongoose from '../config/mongodb';

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const connection = configureMongoose();

export default connection.model('User', UserSchema);
