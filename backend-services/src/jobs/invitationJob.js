import notifyNewChat from '../mailers/notifyNewChat';

export default async function invitationJob(job) {
  let message = await notifyNewChat(job.data);
  return message.id;
}
