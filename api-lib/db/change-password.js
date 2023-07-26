import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import normalizeEmail from 'validator/lib/normalizeEmail';

export async function changePassword(db, { email, password, dentistId }, data) {
  // return db
  //   .collection('users')
  //   .findOneAndUpdate(
  //     { _id: new ObjectId(id) },
  //     { $set: data },
  //     { returnDocument: 'after', projection: { password: 0 } }
  //   )
  //   .then(({ value }) => value);
  console.log(email, password, 'oooooooo');
  //   return;
  email = normalizeEmail(email);
  const hashedNewPassword = await bcrypt.hash(password, 10);
  //   console.log(typeof dentistId, 'typeof id');
  //   console.log(dentistId, 'id');
  const user = await db
    .collection('users')
    // .findOne({ _id: new ObjectId(dentistId) });
    .updateOne(
      { _id: new ObjectId(dentistId) },
      { $set: { password: hashedNewPassword } }
    );
  //   console.log(user, password, 'userssss');
  return { user };
  //   if (user && (await bcrypt.compare(password, user.password))) {
  //     return { ...user, password }; // filtered out password
  //   }
}

//   email = normalizeEmail(email);
//   const user = await db.collection('users').findOne({ email });
//   if (user && (await bcrypt.compare(password, user.password))) {
//     return { ...user, password: undefined }; // filtered out password
//   }
