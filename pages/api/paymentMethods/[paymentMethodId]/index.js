import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const handler = nc(ncOpts);

handler.use(database);

handler.get(async (req, res) => {
  console.log(req.query, 'req.query ==');
  const { paymentMethodId } = req.query;
  // const { customerId } = req.body;

  const customer = await stripe.customers.retrieve(paymentMethodId);
  const paymentMethods = await stripe.customers.listPaymentMethods(
    paymentMethodId
  );
  console.log(paymentMethods, 'pppppp');
  // if()
  const defaultMethod = paymentMethods.data.map((item, index) => {
    // let pmid = item.id;
    return (paymentMethods.data[index].card.default_source =
      item.id == customer.invoice_settings.default_payment_method);
    // return {
    //   [pmid]:
    // };
    //  let paymentMethods.push()
  });
  // console.log(dentist, 'teacher');
  res.json({ paymentMethods });
});

handler.delete(async (req, res) => {
  console.log(req.query, 'req.query ==');
  const { paymentMethodId } = req.query;
  const paymentMethod = await stripe.paymentMethods.detach(
    // 'pm_1NazuJFH7jk2A82v6udhbgo7'
    paymentMethodId
    // 'pm_1Nb09CFH7jk2A82vnM2bHgdT'
  );
  // console.log(dentist, 'teacher');
  res.json({ paymentMethod });
});

export default handler;
