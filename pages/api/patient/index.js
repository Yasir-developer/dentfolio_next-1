// const { sendMail } = require("@/api-lib/mail copy");
import { findEmailById } from '@/api-lib/db';

import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';
import { sendMail } from '@/api-lib/mail';
import { insertContact } from '@/api-lib/db/contact';
const handler = nc(ncOpts);
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
            background-color: #007bff;
            color: #ffffff;
            padding: 10px;
            text-align: center;
        }
        .content {
            padding: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Your Email Header</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>This is your email content.</p>
            <p>Regards,</p>
            <p>Your Name</p>
        </div>
    </div>
</body>
</html>
`;

handler.use(database);
handler.post(...auths, async (req, res) => {
  // if (!req.user) {
  //   return res.status(401).end();
  // }
  const { dentistId, description, patient_name, patient_email, phone_no } =
    req.body;

  // await updateCoursesInUser(req.db, studentId, courseId);

  // const teacherEmail = await findEmailById(req.db, teacherId);
  const dentistEmail = await findEmailById(req.db, dentistId);
  console.log(dentistEmail, 'dentistEmail');
  console.log(dentistId, description, patient_name, patient_email, phone_no);
  // return;
  const ContactMe = insertContact(req.db, {
    description: description,
    email: patient_email,
    phone: phone_no,
    name: patient_name,
    // caseType: req.body.tags,
    // visibility: req.body.selectedOption == 'public' ? 1 : 0,
    dentistId: dentistId,
  });

  await sendMail({
    from: 'contact@dentfolio.co.uk',
    to: dentistEmail.email,
    subject: 'You have received a new query on Dentfolio',
    html: emailTemplate,
    //  `<div>
    // <p>Patient Name:</p>
    // <p>${patient_name}</p>
    // <p>Patient Email:<p/>
    // <p>${patient_email}</p>
    // <p>Patient Phone Number:<p/>
    // <p>${phone_no}</p>
    // <p>Description:<p/>
    // <p>${description}</p>
    //   </div>`,
  });

  // await sendMail({
  //   to: studentEmail.email,
  //   subject: "Class Request",
  //   html: "<div><p>You created a New Class Request. Thanks!</p></div>",
  // });

  return res.json({ contact: ContactMe, message: 'Email sent Successfully!' });
});
export default handler;
