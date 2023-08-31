import { createToken } from '@/api-lib/db';
import { CONFIG as MAIL_CONFIG, sendMail } from '@/api-lib/mail';
import { auths, database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import { server } from 'config';
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
  const emailTemplate = `
  <!DOCTYPE html>
  <html>
  <head>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
          }
          .header {
<!--                 background-color: #007bff; -->
              color: #ffffff;
              padding: 10px;
<!--           width:100px -->
<!--                 text-align: center; -->
          }
          .content {
              padding: 10px;
          }
        .headerText{
        font-size:20px;
<!--           font-style:bold -->
        color:#000000
        }
        .dentText{
        color:#0372E2
        }
        .heading{
        color:#d6d3cc;
         font-weight: bold;
        }
        .footer{
          height:20px; background-color:#001323; width:600px; align-items:center; justify-content:center
        }
        .footerText{
          text-align:center; color:#fff; font-size:14px; background-color:#001323        }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
          <img src="${server}/images/logo.png" alt="Sample Image" />
        
            <h1 class="headerText" style="font-size:20px; color:#000000">Hello 
                 <span class="dentText" style="color:#0372E2">${firstName}</span></h1>
          </div>
          <div class="content">
          <p>Please follow <a href="${server}/verify-email/${token._id}">this link</a> to confirm your email.</p>

           
          </div>

          <footer style="height:20px; background-color:#001323; width:600px; align-items:center; justify-content:center">
          <p  class="footerText" style="text-align:center; color:#fff; font-size:14px; background-color:#001323"  >
                  © Copyright 2023 Dentfolio. All Rights Reserved.
                  <p>
            </footer>
      </div>
  </body>
  </html>
    `;

  await sendMail({
    to: email,
    from: 'contact@dentfolio.co.uk',
    subject: `Verification Email for ${server}`,
    html: emailTemplate,
  });

  res.json({
    message: 'Email Sent!',
  });
});

export default handler;
