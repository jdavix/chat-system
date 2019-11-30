import * as _ from '../controllers/messagesController';
import { rescueController } from '../lib/error';

const messagesRoutes = (router) => {
  router.get('/messages', rescueController(_.index));
  router.get('/messages/:id', rescueController(_.show));
  router.post('/messages', rescueController(_.create));
  router.put('/messages/:id', rescueController(_.update));
  router.delete('/messages/:id', rescueController(_.hide));
};


export default messagesRoutes;
