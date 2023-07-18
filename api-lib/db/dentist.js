import { ObjectId } from "mongodb";

export async function getDentistById(db, id) {
  console.log(db, "db");
  console.log(id, "id");

  return db
    .collection("users")
    .find({ _id: new ObjectId(id) })
    .toArray();
}
