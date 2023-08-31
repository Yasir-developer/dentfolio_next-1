// const { sendMail } = require("@/api-lib/mail copy");
import { findEmailById } from '@/api-lib/db';

import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';
import { sendMail } from '@/api-lib/mail';
import { insertContact } from '@/api-lib/db/contact';
import Feed from '../../feed';
import { server } from 'config';
const handler = nc(ncOpts);

handler.use(database);
handler.post(...auths, async (req, res) => {
  // if (!req.user) {
  //   return res.status(401).end();
  // }
  const { dentistId, description, patient_name, patient_email, phone_no } =
    req.body;
  const imagePath = '/images/logo.png';
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
              padding: 20px;
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
        footerText{
          text-align:center; color:#fff; font-size:14px
        }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
          <img src="${server}/images/logo.png" alt="Sample Image" />

              <h1 class="headerText" style="font-size:20px; color:#000000">YOU HAVE RECEIVED A NEW QUERY ON  
                   <span class="dentText" style="color:#0372E2">DENTFOLIO</span></h1>
           
            </h1>
          </div>
          <div class="content">
              <p class="heading" style="color:#A9A9A9; font-weight: bold;">Patient Name</p><p>${patient_name}</p>

            <p class="heading" style="color:#A9A9A9; font-weight: bold;">Patient Email</p><p>${patient_email}</p>
            
            <p class="heading" style="color:#A9A9A9; font-weight: bold;">Patient Phone Number</p><p>${phone_no}</p>
            
            <p class="heading" style="color:#A9A9A9; font-weight: bold;">Description</p><p>${description}</p>
           
          </div>

          <footer style="height:20px; background-color:#001323; width:600px; align-items:center; justify-content:center">
          <p style="text-align:center; color:#fff; font-size:14px" >
                  © Copyright 2023 Dentfolio. All Rights Reserved.
                  <p>
            </footer>
      </div>
  </body>
  </html>
    `;

  const dentistEmail = await findEmailById(req.db, dentistId);
  // console.log(dentistEmail, 'dentistEmail');
  // console.log(dentistId, description, patient_name, patient_email, phone_no);
  // return;
  const ContactMe = insertContact(req.db, {
    description: description,
    email: patient_email,
    phone: phone_no,
    name: patient_name,

    dentistId: dentistId,
  });

  await sendMail({
    from: 'contact@dentfolio.co.uk',
    to: dentistEmail.email,

    subject: 'You have received a new query on Dentfolio',
    html: emailTemplate,
  });

  return res.json({ contact: ContactMe, message: 'Email sent Successfully!' });
});
export default handler;
