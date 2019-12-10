import notifyNewChat from '../mailers/notifyNewChat';

export default async function invitationJob(job) {
  message = await notifyNewChat(job.data);
  return message.id;
}
