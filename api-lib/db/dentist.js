import { ObjectId } from 'mongodb';

export async function getDentistById(db, id) {
  console.log(db, 'db');
  console.log(id, 'id');

  return db.collection('users').findOne({ _id: new ObjectId(id) });
  // .toArray();
}

export async function listDentistByLocation(db, { lat, lng, r }) {
  console.log(lat);
  return db
    .collection('users')
    .find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [106.9060745, -6.195999599999999], // MongoDB requires longitude first, then latitude
          },
          $maxDistance: parseInt(100000),
          // $maxDistance: r,
        },
      },
    })
    .toArray();

  // .toArray();
}
