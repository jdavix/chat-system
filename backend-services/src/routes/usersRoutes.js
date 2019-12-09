import * as _ from '../controllers/usersController';
import { rescueController } from '../lib/error';


const usersRoutes = (router, authenticate) => {
  router.get('/users/:id', authenticate, _.show);
  router.post('/users', rescueController(_.create));
  router.post('/users/signin', rescueController(_.signIn));
};


export default usersRoutes;
