import User from '../models/user';
import GroupChat from '../models/groupChat';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '../config/env';
import ApiError from '../lib/error';
import queue from '../queues';
import { ACCEPT_INVITES_QUEUE } from '../queues/constants';

export const me = async (req, res) => {
  let user = await User.findById(req.body.currentUserId);
  if (!user) throw new ApiError(404, 'Message not found') ;

  res.json(user.serialize());
};

export const create = async (req, res) => {
  // Password is encrypted in a pre-hook
  const params = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }
  let user = new User(params);
  let error = user.validateSync();
  if (!error) {
    let resp = await user.save()
    let id = resp._id.toHexString();
    const token = jwt.sign({id: id}, env.secret, {expiresIn: '24h'});

    const data = {email: resp.email, user_id: resp._id.toHexString()}
    // Accept 10 invites now and process the rest in the background:
    await GroupChat.acceptInvites({...data, limit: 10})
    queue(ACCEPT_INVITES_QUEUE).performLater(data);

    res.json({...user.serialize(), _id: id, token});
  } else {
    throw new ApiError(422, 'User could not be created', error.errors)
  }
};

export const signIn = async (req, res, next) => {
  let user = await User.findOne({email: req.body.email})

  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = jwt.sign({id: user._id.toHexString()}, env.secret, { expiresIn: '24h' });

    const data = {email: user.email, user_id: user._id.toHexString()}
    // Accept 10 invites now and process the rest in the background:
    let resp = await GroupChat.acceptInvites({...data, limit: 10});
    queue(ACCEPT_INVITES_QUEUE).performLater(data);

    res.json({...user.serialize(), token});
  } else {
    throw new ApiError(401, 'Email or Password are invalid', {});
  }
}