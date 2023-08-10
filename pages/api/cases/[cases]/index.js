import { deleteCase } from '@/api-lib/db';
import { database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

handler.delete(async (req, res) => {
  // console.log(req.query.cases, 'req.query.case');
  //   return;
  const cases = await deleteCase(req.db, req.query.cases);
  res.json({ case: cases, message: 'Case Deleted' });
});

export default handler;
