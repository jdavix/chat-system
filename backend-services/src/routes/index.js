import messagesRoutes from './messagesRoutes';
import usersRoutes from './usersRoutes';
import groupChatRoutes from './groupChatsRoutes';

const applyRoutes = (router) => {
  messagesRoutes(router);
  usersRoutes(router);
  groupChatRoutes(router);
};

export default applyRoutes;
