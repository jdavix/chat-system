import * as _ from '../controllers/groupChatController';
import { rescueController } from '../lib/error';

const groupChatsRoutes = (router) => {
  router.get('/group_chats', rescueController(_.index));
  router.get('/group_chats/:id', rescueController(_.show));
  router.post('/group_chats', rescueController(_.create));
  router.put('/group_chats/:id', rescueController(_.update));
};


export default groupChatsRoutes;
