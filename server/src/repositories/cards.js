import { ObjectId } from 'mongodb';

let apps;

function init(db) {
  if (!apps) {
    apps = db.collection('cards');
  }
}

function create(data, sub) {
  return apps.insertOne({ ...data, status: 'Pending', createdAt: Date.now(), createdBy: sub });
}

async function getMany({ page, amount = 50 }, query) {
  try {
    if (!apps) throw new Error('DB not initialized');

    if (page) {
      const queryObj = queryToDocument(query);
      queryObj.status = 'Active';
      console.log('Query Object:', queryObj); // дебаг
      const result = await apps
          .find(queryObj)
          .limit(+amount)
          .skip((page - 1) * +amount)
          .sort({ _id: -1 })
          .toArray();
      console.log('DB result:', result);
      return result;
    }

    throw new Error("Query 'page' dont send");
  } catch (err) {
    console.error('getMany Error:', err);
    throw err;
  }
}

function getCount(query) {
  const queryObj = queryToDocument(query);
  queryObj.status = 'Active';
  return apps.count(queryObj);
}

async function getOne(id) {
  const dbResponse = await apps.findOne({ _id: ObjectId(id) });

  if (dbResponse === null) {
    const error = new Error('Not found');
    error.status = 404;
    throw error;
  }
  return dbResponse;
}

async function updateById(id, doc, sub) {
  const myCard = await apps.findOne({ _id: ObjectId(id) });

  if (sub === myCard.createdBy) {
    const res = await apps.replaceOne(
      { _id: ObjectId(id) },
      { ...myCard, ...doc, status: 'Pending' }
    );
    return res.acknowledged;
  }

  const error = new Error('you have no control over this card');
  error.status = 404;
  throw error;
}

async function updateStatusCard(id, status) {
  const res = await apps.updateOne({ _id: ObjectId(id) }, { $set: { status: status } });
  return res.acknowledged;
}

function findPending() {
  return apps.find({ status: 'Pending' }).toArray();
}

async function deleteById(id, sub) {
  const myCard = await apps.findOne({ _id: ObjectId(id) });

  if (sub === myCard.createdBy) {
    let imagesKey = [];
    if (myCard.images[0] && myCard.images[0].key) {
      imagesKey = myCard.images.map((image) => image.key);
    }
    await apps.deleteOne({ _id: ObjectId(id) });
    return imagesKey;
  }

  const error = new Error('you have no control over this card');
  error.status = 404;
  throw error;
}

function getMyCards(sub) {
  return apps.find({ createdBy: sub }).sort({ _id: -1 }).toArray();
}

function queryToDocument(query) {
  const mapping = {
    type: function (value) {
      return { type: value };
    },
    category: function (value) {
      return { category: value };
    },
    search: function (value) {
      return { title: { $regex: value, $options: 'i' } };
    },
  };

  return Object.entries(query).reduce((acc, [key, value]) => {
    if (Boolean(value) === true) {
      return Object.assign(acc, mapping[key](value));
    }

    return acc;
  }, {});
}

export default {
  init,
  getMyCards,
  deleteById,
  updateStatusCard,
  getCount,
  updateById,
  create,
  getMany,
  getOne,
  findPending,
};
