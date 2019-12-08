import * as _ from '../controllers/messagesController';
import { rescueController } from '../lib/error';

const messagesRoutes = (router, authenticate) => {
  router.get('/messages', authenticate, rescueController(_.index));
  router.get('/messages/:id', authenticate, rescueController(_.show));
  router.post('/messages', authenticate, rescueController(_.create));
  router.put('/messages/:id', authenticate, rescueController(_.update));
  router.delete('/messages/:id', authenticate, rescueController(_.hide));
};


export default messagesRoutes;
