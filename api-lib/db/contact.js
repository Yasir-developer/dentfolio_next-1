export async function insertContact(
  db,
  { name, description, email, phone, dentistId }
) {
  const contact = {
    name,
    description,

    email,
    phone,
    dentistId,

    // createdAt: new Date(),
  };
  const ContactMe = await db.collection('contact').insertOne(contact);
  // console.log(cases, 'cases ======');
  return ContactMe;

  //   return db
  //     .collection('users')
  //     .find({ _id: new ObjectId(id) })
  //     .toArray();
}
