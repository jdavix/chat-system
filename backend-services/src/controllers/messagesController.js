import Message from '../models/message';
import BasicError from '../lib/error';

export const index = async (req, res, next) => {
  console.log("PMS: ", req.query);
  console.log("ChatID: ", req.query.chat_id);
  let result = await Message.find({group_chat: req.query.chat_id});
  res.json(result);
};

export const show = async (req, res, next) => {
  let message = await Message.findById(req.params.id);
  if (!message) throw new ApiError(404, 'Message not found') ;

  res.json(message);
};

export const create = async (req, res) => {
  const params = {
    text: req.params.text,
    sent_at: req.params.sent_at,
    group_chat: req.params.group_chat_id,
  }
  let message = new Message(params);
  let error = message.validateSync();
  if (!error) {
    res.json(message);
  } else {
    throw new ApiError(422, 'Message could not be created', error.errors)
  }
};


export const update = async (req, res) => {
  const params = {
    text: req.params.text,
    sent_at: req.params.sent_at,
    group_chat: req.params.group_chat_id
  }
  let message = await Message.findById(req.params.id);
  if (!message) throw new ApiError(404, 'Message not found') ;

  message.set(params)

  try {
    let result = await message.save()
    res.json(message);
  } catch(error) {
    throw new ApiError(422, 'Group Chat could not be updated', error.errors)
  }
};

export const hide = (req, res) => {
  // pending
};
