import mongoose from 'mongoose';

const MAX_INVITES = 10

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
  invitations: {
    type: Array,
    required: true,
    validate: [(group) => (group.length <= MAX_INVITES), `More than ${MAX_INVITES} users in a chat is not allowed`],
  },
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const { connection } = mongoose;

GroupChatSchema

GroupChatSchema.statics.acceptInvites = async function ({user_id, email, limit}) {
  let groups = this.find({
                          invitations: { $in: [email] },
                          participants: { $nin: [user_id] },
                       });

  // Accept a first set of elements only:
  if (limit) {
    groups = groups.limit(limit);
  }

  groups = await groups.exec();

  groups.forEach(async (group) => {
    group.participants.push(user_id);
    await group.save()
  });

  return {user_id, email};
}

export default connection.model('GroupChat', GroupChatSchema);
