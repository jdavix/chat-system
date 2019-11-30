import messagesRoutes from './messagesRoutes';
import usersRoutes from './usersRoutes';

const applyRoutes = (router) => {
  messagesRoutes(router);
  usersRoutes(router);
};

export default applyRoutes;
