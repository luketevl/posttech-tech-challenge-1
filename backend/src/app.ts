import 'dotenv/config'
import Registry from './infra/di/Registry.ts'
import CarRepositoryRedis from './infra/repository/CarRepositoryOrm.ts'

(async () => {
  const connection = new 
  const carRepository = new CarRepositoryRedis(connection)
})
const app = express()

Registry.getInstance().provide("signup", signup);

export default app;

