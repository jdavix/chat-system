import * as _ from '../controllers/usersController';

const usersRoutes = (router, authenticate) => {
  router.get('/users/:id', authenticate, _.show);
  router.post('/users', authenticate, _.create);
  router.put('/users/signin', authenticate, _.signIn);
};


export default usersRoutes;
