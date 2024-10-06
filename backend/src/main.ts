import CreateCar from './application/useCase/Car/CreateCar.ts';
import DeleteCar from './application/useCase/Car/DeleteCar.ts';
import GetCar from './application/useCase/Car/GetCar.ts';
import ListCars from './application/useCase/Car/ListCars.ts';
import UpdateCar from './application/useCase/Car/UpdateCar.ts';
import CreateOrder from './application/useCase/Order/CreateOrder.ts';
import { PORT } from './config/App.ts';
import CarController from './infra/controler/CarController.ts';
import OrderController from './infra/controler/OrderController.ts';
import PgPromiseAdapter from './infra/database/PgPromiseAdapter.ts';
import ExpressAdapter from './infra/http/ExpressAdapter.ts';
import ORM from './infra/orm/ORM.ts';
import CarRepositoryOrm from './infra/repository/CarRepositoryOrm.ts';
import OrderRepositoryOrm from './infra/repository/OrderRepositoryOrm.ts';

(async () => {
  const connection = new PgPromiseAdapter();
  const httpServer = new ExpressAdapter();
  const orm = new ORM(connection);
  const carRepository = new CarRepositoryOrm(orm);
  const orderRepository = new OrderRepositoryOrm(orm);
  const createCar = new CreateCar(carRepository)
  const updateCar = new UpdateCar(carRepository, orderRepository)
  const deleteCar  = new DeleteCar(carRepository, orderRepository)
  const getCar  = new GetCar(carRepository)
  const listCars = new ListCars(carRepository)

  const createOrder = new CreateOrder(orderRepository, carRepository)
  new CarController(httpServer, createCar, updateCar, deleteCar, getCar, listCars);
  new OrderController(httpServer, createOrder);
  httpServer.listen(PORT);
})();
