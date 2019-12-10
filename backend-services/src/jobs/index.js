import {
  INVITES_QUEUE,
  NOTIFICATIONS_QUEUE,
  ACCEPT_INVITES_QUEUE,
} from '../queues/constants';
import acceptInvitationsJob from './acceptInvitationsJob';
import notificationJob from './notificationJob';
import invitationJob from './invitationJob';

export default {
  [INVITES_QUEUE]: invitationJob,
  // [NOTIFICATIONS_QUEUE]: notificationJob,
  [ACCEPT_INVITES_QUEUE]: acceptInvitationsJob,
};
