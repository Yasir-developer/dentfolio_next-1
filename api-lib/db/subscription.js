import { ObjectId } from 'mongodb';

export async function insertSubscriptions(
  db,
  { dentistId, source, total, transactionId, firstName, email, allPaymentIds }
) {
  console.log(
    dentistId,

    total,
    transactionId,
    allPaymentIds,
    'transactionId'
  );
  const subscrption = {
    dentistId: new ObjectId(dentistId),
    firstName,
    email,
    allPaymentIds,
    // total,

    isDeleted: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const { insertedId } = await db
    .collection('subscrptions')
    .insertOne(subscrption);
  subscrption._id = insertedId;
  return subscrption;
}

export async function updateUser(db, id, { paymentVerified }) {
  console.log(paymentVerified, 'da');
  const updatedData = await db
    .collection('users')
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { paymentVerified } },

      { returnDocument: 'after' }
    )
    .then(({ value }) => value);
  return updatedData;
}
