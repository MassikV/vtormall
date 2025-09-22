import { nanoid } from 'nanoid';
import { join } from 'path';
import { createWriteStream } from 'fs';

async function uploadHandler(request, reply) {
  try {
    const files = [];
    const images = await request.files();

    for await (const image of images) {
      if (image.fieldname !== 'files[]') {
        throw new Error('field name should be `files[]`');
      }

      // Определяем расширение
      const imageType = image.filename.match(/\.(jpg|png|webp|jpeg)/i)?.[0] || '.jpg';
      const newFileName = nanoid() + imageType;

      // Путь до папки uploads
      const filePath = join(process.cwd(), 'src', 'uploads', newFileName);

      // Сохраняем файл на диск
      await new Promise((resolve, reject) => {
        const stream = createWriteStream(filePath);
        image.file.pipe(stream);
        stream.on('finish', resolve);
        stream.on('error', reject);
      });

      // URL для фронтенда
      const fileUrl = `/uploads/${newFileName}`;

      files.push({
        url: fileUrl,
        key: newFileName,
        originalName: image.filename,
      });
    }

    reply.send(files);
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: error.message });
  }
}

async function deleteHandler(request, reply) {
  try {
    const { key } = request.body;
    if (!key) throw new Error('no key provided');

    const filePath = join(process.cwd(), 'src', 'uploads', key);
    await fs.promises.unlink(filePath);

    reply.code(200).send({ success: true });
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
}

export default (fastify, __, done) => {
  fastify.route({
    method: 'POST',
    url: '/',
    handler: uploadHandler,
  });

  fastify.route({
    method: 'DELETE',
    url: '/',
    handler: deleteHandler,
  });

  done();
};
