import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const handler = nc(ncOpts);

handler.use(database);

handler.post(async (req, res) => {
  console.log(req.body.customer_id, 'req.body.email');
  console.log(req.body.paymentMethod_id, 'req.body.email');
  // return;
  const primary = await stripe.customers.update(
    req.body.customer_id,

    {
      invoice_settings: {
        default_payment_method: req.body.paymentMethod_id,
      },
    }
  );
  res.json({ primary });
});

export default handler;
