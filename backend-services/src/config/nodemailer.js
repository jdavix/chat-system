import nodemailer from 'nodemailer';
import env from './env';

const transport = nodemailer.createTransport(env.smtp);

export default transport;
