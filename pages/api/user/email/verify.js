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
  const { id, firstName, email } = req.query;
  console.log(id, firstName, email);
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
        <p>Hello, ${firstName}</p>
        <p>Please follow <a href="${server}/verify-email/${token._id}">this link</a> to confirm your email.</p>
      </div>
      `,
  });

  res.json({
    message: 'Email Sent!',
  });
});

export default handler;
