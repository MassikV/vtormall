import fastify from 'fastify';
import fastifyHelmet from '@fastify/helmet';
import fastifyCors from '@fastify/cors';
import fastifyMultipart from '@fastify/multipart';

import myCardsRoute from './routes/my/index.js';
import cardsRoutes from './routes/cards/index.js';
import uploadRoutes from './routes/upload/index.js';
import fastifyAuth0Verify from 'fastify-auth0-verify';
import { join } from 'path';
import { createReadStream } from 'fs';
import mime from 'mime-types';

const app = fastify();

await app.register(fastifyCors, {
  origin: "*",
});

app.get('/uploads/:file', async (req, reply) => {
  const { file } = req.params;
  const filePath = join(process.cwd(), 'src', 'uploads', file);

  const contentType = mime.lookup(filePath) || 'application/octet-stream';
  reply.type(contentType);

  return reply.send(createReadStream(filePath));
});

app.register(fastifyHelmet);
app.register(fastifyMultipart);

app.register(fastifyAuth0Verify, {
  domain: process.env.AUTH0_DOMAIN,
  secret: process.env.AUTH0_SECRET,
});
app.register(fastifyHelmet, {
  crossOriginResourcePolicy: { policy: "cross-origin" },
});


app.register(cardsRoutes, { prefix: '/cards' });
app.register(myCardsRoute, { prefix: '/my' });
app.register(uploadRoutes, { prefix: '/upload' });

export default app;
