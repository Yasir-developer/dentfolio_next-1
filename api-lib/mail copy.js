// This project uses the nodemailer library to send email
// However, it is recommended to switch over to dedicated email services
// like Mailgun, AWS SES, etc.
import nodemailer from 'nodemailer';

console.log(process.env.NODEMAILER_CONFIG);

const nodemailerConfig =
  '{"service":"Gmail","auth":{"user":"ali.raza@esoultechnologies.com","pass":"55678926"}}'
    ? JSON.parse(
        '{"service":"Gmail","auth":{"user":"ali.raza@esoultechnologies.com","pass":"55678926"}}'
      )
    : {};

const transporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.esoultechnologies.com',
  auth: {
    user: 'ali.raza@esoultechnologies.com',
    pass: '55678926',
  },
  secure: true,
});

export async function sendMail({ from, to, subject, html }) {
  try {
    await transporter.sendMail({
      from: 'ali.raza@esoultechnologies.com',
      to: 'alifr849@gmail.com',
      subject: 'this is dummy emAIL',
      html: 'SAKDMAKDMADKMDKMS',
    });
  } catch (e) {
    console.error(e);
    throw new Error(`Could not send email: ${e.message}`);
  }
}

export const CONFIG = {
  // TODO: Replace with the email you want to use to send email
  from: nodemailerConfig?.auth?.user,
};
