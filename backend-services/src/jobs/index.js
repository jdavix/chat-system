import {
  INVITES_QUEUE,
  NOTIFICATIONS_QUEUE,
  ACCEPT_INVITES_QUEUE,
} from '../queues/constants';
import acceptInvitationsJob from './acceptInvitationsJob';
import notificationJob from './notificationJob';
import invitationJob from './invitationJob';

export default {
  [INVITES_QUEUE]: { job: invitationJob, config: {} },
  [NOTIFICATIONS_QUEUE]: { job: notificationJob, config: { max: 2, duration: 1 } },
  [ACCEPT_INVITES_QUEUE]: { job: acceptInvitationsJob, config: {} },
};
