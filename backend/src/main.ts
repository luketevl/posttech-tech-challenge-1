import PgPromiseAdapter from './infra/database/PgPromiseAdapter.ts';
import ExpressAdapter from './infra/http/ExpressAdapter.ts';
import Registry from './infra/di/Registry.ts';
import ORM from './infra/orm/ORM.ts';

// import ProcessPayment from "./application/usecase/payment/ProcessPayment";
// import PaymentController from "./infra/controller/PaymentController";

(async () => {
  const connection = new PgPromiseAdapter();
  const httpServer = new ExpressAdapter();
  const orm = new ORM(connection);
  const transactionRepository = new TransactionRepositoryORM(orm);
  const processPayment = new ProcessPayment(
    transactionRepository,
    new PJBankGateway(),
    new CieloGateway(),
  );
  const getTransaction = new GetTransactionByRideId(transactionRepository);
  new PaymentController(httpServer, processPayment, getTransaction);
  const queue = new RabbitMQAdapter();
  await queue.connect();
  await queue.setup('rideCompleted', 'rideCompleted.processPayment');
  new QueueController(queue, processPayment);
  httpServer.listen(3002);
})();
