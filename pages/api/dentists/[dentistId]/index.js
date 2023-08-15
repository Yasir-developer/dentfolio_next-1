import { getDentistById } from '@/api-lib/db';
import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

handler.get(async (req, res) => {
  console.log('kmsdkasmdaksm');
  const userId = req.user?.userId;

  const user = await getDentistById(req.db, req.query.dentistId);
  res.json({ user });
});

export default handler;
