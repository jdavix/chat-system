import Message from '../models/message';
import ApiError from '../lib/error';

export const index = async (req, res, next) => {
  let result = await Message.find({group_chat: req.query.chat_id});
  res.json(result);
};

export const hide = (req, res) => {
  // pending
};
