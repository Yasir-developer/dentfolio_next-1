import { ObjectId } from 'mongodb';

export async function insertCase(db, { case_title, dentistId }) {
  console.log(case_title, 'content');
  const cases = {
    case_title,
    dentistId,
    // createdAt: new Date(),
  };
  const { insertedId, caseTitle } = await db
    .collection('cases')
    .insertOne(cases);
  cases._id = insertedId;
  cases.case_title = caseTitle;
  console.log(cases, 'cases');
  //   cases.content = content;
  return cases;

  //   return db
  //     .collection('users')
  //     .find({ _id: new ObjectId(id) })
  //     .toArray();
}
