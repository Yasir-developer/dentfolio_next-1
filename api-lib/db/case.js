import { ObjectId } from 'mongodb';

export async function insertCase(
  db,
  { case_title, description, visibility, caseType, dentistId, cases_photo }
) {
  const cases = {
    case_title,
    description,
    visibility,
    caseType: JSON.parse(caseType),
    dentistId,
    cases_photo,
    // createdAt: new Date(),
  };
  const newCase = await db.collection('cases').insertOne(cases);
  console.log(cases, 'cases ======');
  return newCase;

  //   return db
  //     .collection('users')
  //     .find({ _id: new ObjectId(id) })
  //     .toArray();
}
export async function getCases(db, { dentistId }) {
  const newCase = await db.collection('cases').find({ dentistId }).toArray();
  // .find({dentistId:new ObjectId(dentistId.toString())}).toArray();
  return newCase;
}
