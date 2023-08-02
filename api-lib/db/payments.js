import { ObjectId } from 'mongodb';

export async function insertPayments(
  db,
  { order_id, user_id, user_role, type, amount, reference, status }
) {
  const payment = {
    subscrption_id,
    user_id: new ObjectId(user_id),
    //   user_role,
    type,
    amount,
    reference,
    status,
    isDeleted: null,
    created_at: new Date(),
    updated_at: new Date(),
  };
  const { insertedId } = await db.collection('payment').insertOne(payment);
  payment._id = insertedId;
  return payment;
}
