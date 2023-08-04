import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const handler = nc(ncOpts);

handler.use(database);

handler.get(async (req, res) => {
  console.log(req.query, 'req.query ==');
  const { dentistId } = req.query;
  const invoices = await stripe.invoices.list({
    customer: dentistId,
    // limit: 3,
  });
  let obj = [];
  const invoicesData = invoices.data.map((item, index) => {
    // obj.push({ status: item.status, number: item.number });
    // obj[index] = [, item.number];
    return {
      status: item.amount_paid == 0 ? 'Free Trial' : item.status,
      number: item.number,
      date: new Date(item.created * 1000).toLocaleDateString(),

      amount_paid: item.amount_paid,
    };
  });
  // const invoicesData = {
  //   invoice_no: invoices.data.map,
  // };
  // console.log(dentist, 'teacher');
  res.json({ invoicesData });
});
export default handler;
