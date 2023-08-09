// const { sendMail } = require("@/api-lib/mail copy");
import { findEmailById } from '@/api-lib/db';

import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';
import { sendMail } from '@/api-lib/mail';
const handler = nc(ncOpts);

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

  await sendMail({
    from: 'alifr849@gmail.com',
    to: dentistEmail.email,
    subject: 'Patient Problem Description',
    html: `<div>
    <p>Patient Name:</p>
    <p>${patient_name}</p>
    <p>Patient Email:<p/>
    <p>${patient_email}</p>
    <p>Patient Phone Number:<p/>
    <p>${phone_no}</p>
    <p>Description:<p/>
    <p>${description}</p>
      </div>`,
  });

  // await sendMail({
  //   to: studentEmail.email,
  //   subject: "Class Request",
  //   html: "<div><p>You created a New Class Request. Thanks!</p></div>",
  // });

  return res.json({ message: 'Email sent Successfully!' });
});
export default handler;
