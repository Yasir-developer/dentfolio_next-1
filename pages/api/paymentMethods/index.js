import { ValidateProps } from '@/api-lib/constants';
import {
  findPosts,
  getDentistById,
  insertPost,
  updateUserById,
} from '@/api-lib/db';
import { insertPayments } from '@/api-lib/db/payments';
import { insertSubscriptions } from '@/api-lib/db/subscription';
import { auths, database, validateBody } from '@/api-lib/middlewares';
// import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import { ObjectId } from 'mongodb';
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
      customer,
      items,
      source,
      token,
      firstName,
      email,
      city,
      country,
      line1,
      line2,
      postal_code,

      //   cardNumber,
      //   cardExpMonth,
      //   cardExpYear,
      //   cvc,
      //   transactionId,
    } = req.body;
    console.log(firstName, email, 'dentistId');

    const dentist = await getDentistById(req.db, req.body.dentistId);
    // console.log(dentist, 'teacher');
    // res.json({ dentist });
    // return;
    // let charge;

    const paymentMethod = await stripe.paymentMethods.create({
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
    });
    console.log(paymentMethod.id, 'paymentMethod.id');

    const AttachPaymentMethod = await stripe.paymentMethods.attach(
      paymentMethod.id,
      {
        customer: dentist.customer_id,
        // invoice_settings: invoice_settings.default_payment_method,
      }
    );

    const customerData = await stripe.customers.update(dentist.customer_id, {
      invoice_settings: {
        default_payment_method: paymentMethod.id,
      },
    });
    const paymentMethods = await stripe.customers.listPaymentMethods(
      dentist.customer_id
    );
    console.log(paymentMethods, 'return all paymentMethods');
    return res.json({ paymentMethods });
    console.log(customerData, 'customerData');
    // res.js
    // Usage

    let allPaymentIds = {
      payment_id: [{ id: paymentMethod.id, isDefault: false }],
    };
    // console.log(allPaymentIds, 'charge');
    // if (!charge?.id) {
    //   return res.json({ message: 'Payment Unsuccessful!' });
    // }
    console.log(customer, 'customer===');
    const user = await updateUserById(
      req.db,
      req.body.id ? req.body.id : req.user._id,
      allPaymentIds
    );
    //   console.log(user, password, 'userssss');
    return { user };
  }
);

export default handler;
