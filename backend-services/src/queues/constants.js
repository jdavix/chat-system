export const INVITES_QUEUE = 'invitations';
export const NOTIFICATIONS_QUEUE = 'notifications';

// Note: Activate queues by adding them to the array below;
export const allQueues = [
  { name: INVITES_QUEUE, jobPath: './jobs/invitationJob' },
  // { name: NOTIFICATIONS_QUEUE, jobPath: './jobs/notificationJob' },
];
