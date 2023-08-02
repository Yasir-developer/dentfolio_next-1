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
