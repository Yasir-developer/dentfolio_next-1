// import { MongoClient } from 'mongodb';

// let indexesCreated = false;
// async function createIndexes(client) {
//   if (indexesCreated) return client;
//   const db = client.db();
//   await Promise.all([
//     db
//       .collection('tokens')
//       .createIndex({ expireAt: -1 }, { expireAfterSeconds: 0 }),
//     db
//       .collection('posts')
//       .createIndexes([{ key: { createdAt: -1 } }, { key: { creatorId: -1 } }]),
//     db
//       .collection('comments')
//       .createIndexes([{ key: { createdAt: -1 } }, { key: { postId: -1 } }]),
//     db.collection('users').createIndexes([
//       { key: { email: 1 }, unique: true },
//       // { key: { username: 1 }, unique: false },
//     ]),
//   ]);
//   indexesCreated = true;
//   return client;
// }

// export async function getMongoClient() {
//   /**
//    * Global is used here to maintain a cached connection across hot reloads
//    * in development. This prevents connections growing exponentiatlly
//    * during API Route usage.
//    * https://github.com/vercel/next.js/pull/17666
//    */
//   if (!global.mongoClientPromise) {
//     const client = new MongoClient(
//       'mongodb+srv://alirf50:F4omy5EBHUIooNKM@cluster0.nlocabm..net/dentfolio?retryWrites=true&w=majority'
//     );
//     // client.connect() returns an instance of MongoClient when resolved
//     global.mongoClientPromise = client
//       .connect()
//       .then((client) => createIndexes(client));
//   }
//   return global.mongoClientPromise;
// }

// export async function getMongoDb() {
//   const mongoClient = await getMongoClient();
//   return mongoClient.db();
// }

import { MongoClient } from 'mongodb';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentiatlly
 * during API Route usage.
 * https://github.com/vercel/next.js/pull/17666
 */
global.mongo = global.mongo || {};

let indexesCreated = false;
async function createIndexes(db) {
  await Promise.all([
    db.collection('users').createIndexes([{ key: { email: 1 }, unique: true }]),
  ]);
  indexesCreated = true;
}

export async function getMongoClient() {
  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(
      process.env.MONGODB_URI
      // 'mongodb+srv://alirf50:F4omy5EBHUIooNKM@cluster0.nlocabm.mongodb.net/dentfolio?retryWrites=true&w=majority'
    );
  }
  // It is okay to call connect() even if it is connected
  // using node-mongodb-native v4 (it will be no-op)
  // See: https://github.com/mongodb/node-mongodb-native/blob/4.0/docs/CHANGES_4.0.0.md
  await global.mongo.client.connect();
  return global.mongo.client;
}

export default async function database(req, res, next) {
  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(process.env.MONGODB_URI);
    // console.log('hello2');
  }
  req.dbClient = await getMongoClient();
  // console.log(req.dbClient, 'req.dbClient ');
  req.db = req.dbClient.db(); // this use the database specified in the MONGODB_URI (after the "/")
  if (!indexesCreated) await createIndexes(req.db);
  return next();
}
