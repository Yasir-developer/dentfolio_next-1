import { ObjectId } from 'mongodb';

export async function getDentistById(db, id) {
  // console.log(db, 'db');
  // console.log(id, 'id');

  return db.collection('users').findOne({ _id: new ObjectId(id) });
  // .toArray();
}

export async function listDentistByLocation(
  db,
  { latitude, longitude, radius }
) {
  // console.log(lat, lng, r, '---------');
  return db
    .collection('users')
    .find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude], // MongoDB requires longitude first, then latitude
          },
          // $minDistance: 1,
          $maxDistance: radius,
        },
      },
      paymentVerified: true,
    })
    .toArray();

  // .toArray();
}
