import notifyNewChat from '../mailers/notifyNewChat';

export default function invitationJob(job) {
  return notifyNewChat(job.data);
}
