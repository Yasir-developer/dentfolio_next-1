// import { createToken } from '@/api-lib/db';
// import { CONFIG as MAIL_CONFIG, sendMail } from '@/api-lib/mail';
// import { auths } from '@/api-lib/middlewares';
// // import { getMongoDb } from '@/api-lib/mongodb';
// import { ncOpts } from '@/api-lib/nc';
// import nc from 'next-connect';

// const handler = nc(ncOpts);

// handler.use(...auths);

// handler.post(async (req, res) => {
//   if (!req.user) {
//     res.json(401).end();
//     return;
//   }

//   // const db = await getMongoDb();

//   const token = await createToken(db, {
//     creatorId: req.user._id,
//     type: 'emailVerify',
//     expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
//   });

//   await sendMail({
//     to: req.user.email,
//     from: MAIL_CONFIG.from,
//     subject: `Verification Email for ${process.env.WEB_URI}`,
//     html: `
//       <div>
//         <p>Hello, ${req.user.name}</p>
//         <p>Please follow <a href="${process.env.WEB_URI}/verify-email/${token._id}">this link</a> to confirm your email.</p>
//       </div>
//       `,
//   });

//   res.status(204).end();
// });

// export default handler;

import { createToken } from '@/api-lib/db';
import { CONFIG as MAIL_CONFIG, sendMail } from '@/api-lib/mail';
import { auths, database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import { server } from 'Config';
import { ObjectId } from 'mongodb';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database, ...auths);

handler.post(async (req, res) => {
  const { id, name, email } = req.query;
  console.log(id, name, email);
  const token = await createToken(req.db, {
    creatorId: new ObjectId(id),
    type: 'emailVerify',
    expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
  });

  await sendMail({
    to: email,
    from: 'alifr849@gmail.com',
    subject: `Verification Email for ${server}`,
    html: `
      <div>
        <p>Hello, ${name}</p>
        <p>Please follow <a href="${server}/verify-email/${token._id}">this link</a> to confirm your email.</p>
      </div>
      `,
  });

  res.json({
    message: 'Email Sent!',
  });
});

export default handler;
