import notifyNewMessage from '../mailers/notifyNewMessage';

export default async function notificationJob(job) {
  let message = await notifyNewMessage(job.data);
  return message.id;
}