import GroupChat from '../models/groupChat';
import User from '../models/user';
import ApiError from '../lib/error';

export const index = async (req, res, next) => {
  let user_id = req.query.user_id;
  let chat_type = req.query.chat_type;
  console.log("Chat Type: ", chat_type);
  let result = await GroupChat.find({participants: {$in: [user_id]}, chat_type: chat_type});
  res.json(result);
};

export const show = async (req, res, next) => {
  let groupChat = await GroupChat.findById(req.params.id);
  if (!groupChat) throw new ApiError(404, 'Group Chat not found') ;

  res.json(groupChat);
};

export const create = async (req, res) => {
  let participants = await User.find({email: { $in: req.body.invited_emails }})
  participants = participants.map((p)=>{ return p._id.toHexString() })
  let chat_type = 'direct';
  if (req.body.invited_emails.length > 2) chat_type = 'group';
  const params = {
    chat_type: chat_type,
    title: req.body.title,
    participants: participants,
    invitations: req.body.invited_emails,
  }
  console.log("PARAMS: ", params);
  let groupChat = new GroupChat(params);
  let error = groupChat.validateSync();
  if (!error) {
    groupChat.save((err, chat)=>{
      res.json(groupChat);
    })
  } else {
    throw new ApiError(422, 'Group Chat could not be created', error.errors)
  }
};

export const update = async (req, res) => {
  const params = {
    title: req.params.title,
    participants: req.participants,
  }
  let groupChat = await GroupChat.findById(req.params.id);
  if (!groupChat) throw new ApiError(404, 'Group Chat not found') ;

  groupChat.set(params)

  try {
    let result = await groupChat.save()
    res.json(groupChat);
  } catch(error) {
    throw new ApiError(422, 'Group Chat could not be updated', error.errors)
  }

};