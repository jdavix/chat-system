import * as _ from '../controllers/usersController';

const usersRoutes = (router) => {
  router.get('/users/:id', _.show);
  router.post('/users', _.create);
  router.put('/users/:id', _.update);
};


export default usersRoutes;
