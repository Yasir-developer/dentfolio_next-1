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
            coordinates: [-72.68603139999999, 41.9388735], // MongoDB requires longitude first, then latitude
          },
          // $minDistance: 1,
          $maxDistance: 1000000000000,
        },
      },
    })
    .toArray();

  // .toArray();
}
