const { Router } = require('express');
const UserController = require('./Controllers/UserController');
const SessionController = require('./Controllers/SessionController');
const CategoryController = require('./Controllers/CategoryController');
const ProductsContoller = require('./Controllers/ProductsController');
const ProvidersController = require('./Controllers/ProvidersController');
const PurchasesController = require('./Controllers/PurchasesController');
const SalesController = require('./Controllers/SalesController');
const ClientController = require('./Controllers/ClientController');
const auth = require('./middlewares/auth');

const routes = Router();

routes.get('/', (request, response) => response.send('Servidor Impacta'));

routes.post('/session', SessionController.create);

routes.route('/users')
.get(auth, UserController.index)
.post(UserController.create);

routes.route('/users/:id')
.put(auth, UserController.update)
.get(auth, UserController.show);

routes.route('/users/:id/changePwd')
.put(auth, UserController.changePwd)

routes.route('/categories')
.post(CategoryController.create)
.get(CategoryController.index);

routes.route('/categories/:id')
.get(auth, CategoryController.show)
.delete(auth, CategoryController.deleteCategory)
.put(auth, CategoryController.update);

routes.route('/products')
.post(auth, ProductsContoller.create)
.get(auth, ProductsContoller.index);

routes.route('/products/:id')
.get(auth, ProductsContoller.show)
.put(auth, ProductsContoller.update)
.delete(auth, ProductsContoller.deleteProd)

routes.route('/providers')
.post(ProvidersController.create)
.get(auth, ProvidersController.index);

routes.route('/providers/:id')
.get(auth, ProvidersController.show)
.put(auth, ProvidersController.update)
.delete(auth, ProvidersController.deleteProv)

routes.route('/purchases')
.post(auth, PurchasesController.create)
.get(auth, PurchasesController.index);

routes.route('/purchases/:id')
.get(auth, PurchasesController.show)
.put(auth, PurchasesController.update)

routes.route('/clients')
.post(auth, ClientController.create)
.get(auth, ClientController.index);

routes.route('/clients/:id')
.put(auth, ClientController.update)
.delete(auth, ClientController.deleteClient)

routes.route('/sales')
.post(auth, SalesController.create)
.get(auth, SalesController.index);

routes.route('/sales/:id/salesCompleted')
//.get(auth, PurchasesController.show)
.put(auth, SalesController.updateSales);

module.exports = routes;
