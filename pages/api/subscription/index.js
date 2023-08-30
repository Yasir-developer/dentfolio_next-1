import { ValidateProps } from '@/api-lib/constants';
import { findPosts, insertPost, updateUserById } from '@/api-lib/db';
import { insertPayments } from '@/api-lib/db/payments';
import { insertSubscriptions, updateUser } from '@/api-lib/db/subscription';
import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const handler = nc(ncOpts);
handler.use(database);

handler.post(
  ...auths,

  async (req, res) => {
    console.log('herrreee');

    const {
      dentistId,
      city,
      country,
      line1,
      line2,
      postal_code,
      total,
      customer,
      items,
      source,
      token,
      firstName,
      paymentVerified,
      email,
      // subscrption_type,
      customer_id,
      payment_id,
    } = req.body;
    console.log(req.body, email, 'dentistId');

    let charge;
    if (req.body.subscrption_type == '') {
      console.log('payment creation here');

      var paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: { token: token },
        billing_details: {
          address: {
            city: city,
            country: country,
            line1: line1,
            line2: line2,
            postal_code: postal_code,
          },
        },
        //   card: {
        //     number: '4242424242424242',
        //     exp_month: 1,
        //     exp_year: 2033,
        //     cvc: '314',
        //   },
      });
    }
    // console.log(paymentMethod.id, 'paymentMethod.id');

    function getUnixTimestampsForTodayAndAfterOneYear() {
      const today = new Date();
      const afterOneYear = new Date(today);
      afterOneYear.setFullYear(today.getFullYear() + 1);

      const unixTimestampToday = Math.floor(today.getTime() / 1000); // Divide by 1000 to convert to seconds
      const unixTimestampAfterOneYear = Math.floor(
        afterOneYear.getTime() / 1000
      );

      return { unixTimestampToday, unixTimestampAfterOneYear };
    }

    // Usage
    const timestamps = getUnixTimestampsForTodayAndAfterOneYear();
    // console.log('Unix timestamp for today:', timestamps.unixTimestampToday);
    // console.log(
    //   'Unix timestamp for one year from today:',
    //   timestamps.unixTimestampAfterOneYear
    // );
    if (req.body.customer_id == '') {
      console.log('customer creation here');
      var customerObj = await stripe.customers.create({
        description: 'Dentist Monthly Subscription',
        payment_method: paymentMethod.id,
        invoice_settings: { default_payment_method: paymentMethod.id },
        firstName,
        email,

        address: {
          city: city,
          country: country,
          line1: line1,
          line2: line2,
          postal_code: postal_code,
        },
      });
    }
    // return res.json({ message: customerObj.id });

    // console.log(customerObj, 'customerObj');
    // return;
    charge = await stripe.subscriptions.create({
      //   amount: total,
      //   customer: 'cus_ON0y1ecOEscoT6',
      customer: customerObj?.id ? customerObj?.id : customer_id,
      default_payment_method: paymentMethod?.id
        ? paymentMethod?.id
        : payment_id,
      trial_period_days: 30,
      cancel_at: timestamps.unixTimestampAfterOneYear,
      // items: [{ price: 'price_1NaGYqFH7jk2A82vAC2kyeyf' }], test
      items: [{ price: 'price_1NksNBFH7jk2A82vi3EaxVi2' }],
    });
    // console.log(charge, 'charge');
    let allPaymentIds = {
      payment_id: [
        { id: payment_id ? payment_id : paymentMethod.id, isDefault: true },
      ],
      customer_id: customer_id ? customer_id : customerObj.id,
      subscrption_id: charge.id,
    };
    console.log(allPaymentIds, 'charge');
    if (!charge?.id) {
      return res.json({ message: 'Payment Unsuccessful!' });
    }
    // console.log(customer, 'customer===');
    const user = await updateUserById(
      req.db,
      req.body.id ? req.body.id : req.user._id,
      allPaymentIds,
      {
        ...(paymentVerified && { paymentVerified }),
      }
    );
    const subscrption = await insertSubscriptions(req.db, {
      dentistId,
      allPaymentIds,
      firstName,
      email,

      //   source,
    });
    // console.log(customer, 'subscrption');
    return res.json({ user: user });

    const paymentStudent = await insertPayments(req.db, {
      subscrption_id: subscrption._id,
      user_id: dentistId,
      //   user_role: 3,
      type: 'credit',
      amount: total,
      reference: charge?.id,
      //   status: 2,
    });
    return res.json({ subscrption });
  }
);

handler.patch(async (req, res) => {
  const { paymentVerified } = req.body;
  console.log(paymentVerified, 'paymentVerified');

  const user = await updateUser(
    // req.db,
    req.db,
    req.body.id,
    {
      paymentVerified,
    }
  );
  console.log(user, 'subscription user');
  res.json({ user });
});

handler.delete(async (req, res) => {
  console.log(req.body, 'req.query ==');
  // const { subscriptionId } = req.body.subscriptionId;
  const deleted = await stripe.subscriptions.cancel(req.body.subscriptionId);

  // console.log(dentist, 'teacher');
  res.json({ deleted });
});

export default handler;
