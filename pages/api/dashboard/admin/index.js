// import { studentsCount } from "@/api-lib/db/students";
import { dentistsCount, dentistsCountBySubscription } from '@/api-lib/db';
import { database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

handler.get(async (req, res) => {
  //   const students = await studentsCount(req.db);
  const dentists = await dentistsCount(req.db);
  const subscribedDentists = await dentistsCountBySubscription(req.db);

  res.json({ dentists, subscribedDentists });
});

export default handler;
