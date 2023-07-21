import { ObjectId } from 'mongodb';

export async function insertCase(
  db,
  { case_title, description, visibility, caseType, dentistId, cases_photo }
) {
  console.log(case_title, 'content');
  console.log(description, 'description');
  console.log(visibility, 'visibility');
  console.log(caseType, 'caseType');
  console.log(dentistId, 'dentistId');
  const cases = {
    case_title,
    description,
    visibility,
    caseType,
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
  console.log(dentistId.toString());
  console.log(typeof dentistId.toString());
  const newCase = await db.collection('cases').find({ dentistId }).toArray();
  // .find({dentistId:new ObjectId(dentistId.toString())}).toArray();
  console.log(newCase, 'cases');
  return newCase;
}
