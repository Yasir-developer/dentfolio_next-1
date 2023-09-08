import { listDentists } from '@/api-lib/db';
import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

handler.post(async (req, res) => {
  // console.log(req.body, 'req.body');
  // return;
  const { timeFrame } = req.query;
  // console.log(req.query, 'eerrere');
  // console.log(timeFrame, 'timeFrame');
  const currentTime = new Date();
  let startDate;
  if (timeFrame === 'Last 24 hours') {
    startDate = new Date(currentTime - 24 * 60 * 60 * 1000);
  } else if (timeFrame === 'Last week') {
    startDate = new Date(currentTime - 7 * 24 * 60 * 60 * 1000);
  } else if (timeFrame === 'Last month') {
    startDate = new Date(currentTime - 30 * 24 * 60 * 60 * 1000);
  } else if (timeFrame === 'Last year') {
    startDate = new Date(currentTime - 365 * 24 * 60 * 60 * 1000);
  } else {
    throw new Error('Invalid time frame');
  }
  const dentists = await listDentists(req.db, startDate);
  console.log(dentists);
  res.json({ dentists });
});

export default handler;
