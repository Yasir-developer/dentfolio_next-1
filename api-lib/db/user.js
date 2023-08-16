import bcrypt from 'bcryptjs';
import { ObjectId, Timestamp } from 'mongodb';
import normalizeEmail from 'validator/lib/normalizeEmail';

export async function findUserWithEmailAndPassword(db, email, password) {
  email = normalizeEmail(email);
  const user = await db.collection('users').findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    return { ...user, password: undefined }; // filtered out password
  }
  return null;
}

export async function findUserForAuth(db, userId) {
  // console.log(db, 'finffff');
  return db
    .collection('users')
    .findOne({ _id: new ObjectId(userId) }, { projection: { password: 0 } })
    .then((user) => user || null);
}

export async function findUserById(db, userId) {
  return db
    ?.collection('users')
    .findOne({ _id: new ObjectId(userId) }, { projection: dbProjectionUsers() })
    .then((user) => user || null);
}

export async function deleteUserById(db, userId) {
  return db.collection('users').deleteOne({ _id: new ObjectId(userId) });
}
export async function findUserByUsername(db, username) {
  return db
    .collection('users')
    .findOne({ username }, { projection: dbProjectionUsers() })
    .then((user) => user || null);
}

export async function findUserByEmail(db, email) {
  // console.log(db, 'findUserByEmail');
  email = normalizeEmail(email);
  return db
    .collection('users')
    .findOne({ email }, { projection: dbProjectionUsers() })
    .then((user) => user || null);
}
export async function findEmailById(db, userId) {
  return db
    .collection('users')
    .findOne(
      { _id: new ObjectId(userId) },
      { projection: { email: 1, _id: 0 } }
    )
    .then((user) => user || null);
}
export async function updateUserById(db, id, data) {
  console.log(data, 'subs data');
  return db
    .collection('users')
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnDocument: 'after', projection: { password: 0 } }
    )
    .then(({ value }) => value);
}

export async function insertUser(
  db,
  {
    email,
    originalPassword,
    bio = '',
    // name,
    profile_photo,
    userName,
    // bio = '',
    firstName,
    lastName,
    displayName,
    courtesyTitle,
    // speciality,
    // degree,
    gdcNo,
    buildingName,
    streetName,
    city,
    postCode,
    location: [longitude, latitude],
    role,
  }
) {
  const user = {
    emailVerified: false,
    profile_photo: '',
    email,
    paymentVerified: false,
    role,
    // name,
    // username,
    // customer: {},

    bio,
    firstName,
    lastName,
    displayName,
    // speciality,
    // degree,
    gdcNo,
    buildingName,
    streetName,
    location: [longitude, latitude],
    longitude,
    latitude,
    city,
    postCode,
    bio: '',
    userName: '',
    courtesyTitle,
    profile_photo: '',
    treatment_type: [],
    previous_case: [],
    create_at: new Date(),
  };
  const password = await bcrypt.hash(originalPassword, 10);
  const { insertedId } = await db
    .collection('users')
    .insertOne({ ...user, password });
  user._id = insertedId;
  return user;
}

// export async function insertUserByPaymentIds(db, { payment_id }) {
//   const user = {
//     payment_id,
//   };
//   // const password = await bcrypt.hash(originalPassword, 10);
//   const { insertedId } = await db.collection('users').insertOne({ ...user });
//   user._id = insertedId;
//   return user;
// }

export async function updateUserPasswordByOldPassword(
  db,
  id,
  oldPassword,
  newPassword
) {
  const user = await db.collection('users').findOne(new ObjectId(id));
  if (!user) return false;
  const matched = await bcrypt.compare(oldPassword, user.password);
  if (!matched) return false;
  const password = await bcrypt.hash(newPassword, 10);
  await db
    .collection('users')
    .updateOne({ _id: new ObjectId(id) }, { $set: { password } });
  return true;
}

export async function UNSAFE_updateUserPassword(db, id, newPassword) {
  const password = await bcrypt.hash(newPassword, 10);
  await db
    .collection('users')
    .updateOne({ _id: new ObjectId(id) }, { $set: { password } });
}

export function dbProjectionUsers(prefix = '') {
  return {
    [`${prefix}password`]: 0,
    [`${prefix}email`]: 0,
    [`${prefix}emailVerified`]: 0,
  };
}
