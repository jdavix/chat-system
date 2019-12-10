import * as _ from '../controllers/groupChatController';
import { rescueController } from '../lib/error';

const groupChatsRoutes = (router, authenticate) => {
  router.get('/group_chats', authenticate, rescueController(_.index));
  router.get('/group_chats/:id', authenticate, rescueController(_.show));
  router.post('/group_chats', authenticate, rescueController(_.create));
  router.put('/group_chats/:id', authenticate, rescueController(_.update));
  router.post('/group_chats/:id/leave', authenticate, rescueController(_.leave));
};


export default groupChatsRoutes;
