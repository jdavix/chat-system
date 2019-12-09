import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    uniq: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const { connection } = mongoose;

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  this.password = bcrypt.hashSync(this.password, SALT_ROUNDS);
  next();
});

UserSchema.methods.serialize = function() {
  let userJson = this.toObject();
  delete userJson.password;
  return userJson;
};

export default connection.model('User', UserSchema);
