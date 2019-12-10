import GroupChat from '../models/groupChat';

const acceptInvitationsJob = async (job) => {
  const { data } = job;
  GroupChat.acceptInvites(data);
  return data;
};

export default acceptInvitationsJob;
