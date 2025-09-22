import './db.js';
import app from './app.js';
import dotenv from 'dotenv';
import { LOCAL_HOST } from './variables.js';
import { LOCAL_PORT } from './variables.js';
import connectDB from './db.js';

dotenv.config();

const PORT = process.env.PORT || LOCAL_PORT;
const HOST = process.env.HOST || '0.0.0.0';

(async () => {
  await connectDB();

  // app.listen(PORT, () => {
  //   console.log(`🚀 Server running on http://localhost:${PORT}`);
  // });
  app.listen({ port: PORT, host: HOST }, (error, address) => {
    if (error) {
      app.log.error(error);
      process.exit(1);
      throw error;
    }
    console.info(`Server listening on ${address}`);
  });

})();