import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '../config/env';
import ApiError from '../lib/error';

export const show = async (req, res) => {
  let user = await User.findById(req.params.id);
  if (!user) throw new ApiError(404, 'Message not found') ;

  res.json(user);
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
    user.save((err, resp)=>{
      let id = resp._id.toHexString();
      const token = jwt.sign({id: id}, env.secret, {expiresIn: '24h'})
      res.json({...user.serialize(), _id: id, token});
    })
  } else {
    throw new ApiError(422, 'User could not be created', error.errors)
  }
};

export const signIn = async (req, res, next) => {
  let user = await User.findOne({email: req.body.email})

  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = jwt.sign({id: user._id.toHexString()}, env.secret, { expiresIn: '24h' });
    res.json({...user.serialize(), token});
  } else {
    throw new ApiError(401, 'Email or Password are invalid', {});
  }
}