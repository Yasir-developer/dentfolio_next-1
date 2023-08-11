import {
  getDentistById,
  listDentistByLocation,
  listDentists,
} from '@/api-lib/db';
import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

handler.post(async (req, res) => {
  const { latitude, longitude, radius } = req.body;
  // console.log(latitude, longitude, radius, 'radius');
  //   return;
  //   const userId = req.user?.userId;
  //   console.log(userId, 'userId request');
  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);
  const r = parseFloat(radius);
  //   console.log(req.query, 'req.query');
  const user = await listDentistByLocation(req.db, {
    latitude,
    longitude,
    radius,
  });
  // console.log(dentist, 'teacher');
  res.json({ user });
});

handler.get(async (req, res) => {
  const dentists = await listDentists(req.db);

  res.json({ dentists });
});

export default handler;
