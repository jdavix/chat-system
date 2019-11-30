import Message from '../models/message';
import BasicError from '../lib/error';

export const index = async (req, res, next) => {
  let result = await Message.find({});
  res.json(result);
};

export const show = async (req, res, next) => {
  let message = await Message.findById(req.params.id);
  res.json(message);
};

export const create = async (req, res) => {
  let message = Message.create(req.params);
  res.json(message);
};


export const update = (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
};

export const hide = (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
};
