import { ValidateProps } from '@/api-lib/constants';
import { findUserByEmail, findUserByUsername, insertUser } from '@/api-lib/db';
import { auths, database, validateBody } from '@/api-lib/middlewares';
// import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import { slugUsername } from '@/lib/user';
import nc from 'next-connect';
import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';

const handler = nc(ncOpts);
handler.use(database);

handler.post(
  validateBody({
    type: 'object',
    properties: {
      // username: ValidateProps.user.username,
      // name: ValidateProps.user.name,
      password: ValidateProps.user.password,
      email: ValidateProps.user.email,
    },
    required: ['password', 'email'],
    additionalProperties: true,
  }),
  ...auths,
  async (req, res) => {
    // const db = await getMongoDb();

    let {
      // username,
      // name,
      email,
      password,
      firstName,
      lastName,
      displayName,
      username,
      speciality,
      degree,
      gdcNo,
      buildingName,
      streetName,
      city,
      postCode,
      latitude,
      longitude,
      bio,
      courtesyTitle,
      profile_photo,
      treatment_type,
      previous_case,
    } = req.body;
    // username = slugUsername(req.body.username);
    email = normalizeEmail(req.body.email);
    if (!isEmail(email)) {
      res
        .status(400)
        .json({ error: { message: 'The email you entered is invalid.' } });
      return;
    }
    if (await findUserByEmail(req.db, email)) {
      res
        .status(403)
        .json({ error: { message: 'The email has already been used.' } });
      return;
    }
    // if (await findUserByUsername(db, username)) {
    //   res
    //     .status(403)
    //     .json({ error: { message: 'The username has already been taken.' } });
    //   return;
    // }
    const user = await insertUser(req.db, {
      email,
      originalPassword: password,
      // name,
      // username,
      firstName,
      lastName,
      displayName,
      speciality,
      degree,
      gdcNo,
      buildingName,
      streetName,
      latitude,
      longitude,
      city,
      postCode,
      bio: '',
      // username: '',
      courtesyTitle: '',
      profile_photo: '',
      treatment_type: [],
      previous_case: [],
    });
    req.logIn(user, (err) => {
      if (err) throw err;
      res.status(201).json({
        user,
      });
    });
  }
);

export default handler;
