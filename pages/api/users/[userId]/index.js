import { deleteUserById, findUserById } from '@/api-lib/db';
import database from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);
handler.use(database);

handler.get(async (req, res) => {
  // const db = await getMongoDb();
  const user = await findUserById(req.db, req.query.userId);
  // req.user = user;
  res.json({ user });
});

handler.delete(async (req, res) => {
  const user = await deleteUserById(req.db, req.query.userId);
  res.json({ message: 'User Deleted!' });
});

export default handler;
