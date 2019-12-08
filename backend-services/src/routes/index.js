import messagesRoutes from './messagesRoutes';
import usersRoutes from './usersRoutes';
import groupChatRoutes from './groupChatsRoutes';

const applyRoutes = (router, authenticate) => {
  messagesRoutes(router, authenticate);
  usersRoutes(router, authenticate);
  groupChatRoutes(router, authenticate);
};

export default applyRoutes;
