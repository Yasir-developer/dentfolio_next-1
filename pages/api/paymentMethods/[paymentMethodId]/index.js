import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const handler = nc(ncOpts);

handler.use(database);

handler.get(async (req, res) => {
  console.log(req.query, 'req.query ==');
  const { paymentMethodId } = req.query;
  const paymentMethods = await stripe.customers.listPaymentMethods(
    paymentMethodId

    // {type: 'card'}
  );
  // console.log(dentist, 'teacher');
  res.json({ paymentMethods });
});

export default handler;
