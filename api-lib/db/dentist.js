import { ObjectId } from 'mongodb';

export async function getDentistById(db, id) {
  return db.collection('users').findOne({ _id: new ObjectId(id) });
}

export async function dentistsCount(db) {
  // const currentTime = new Date();
  // let startDate;
  // if (timeFrame === '24hrs') {
  //   startDate = new Date(currentTime - 24 * 60 * 60 * 1000);

  // }

  return db.collection('users').find({ role: 0 }).count();
}

export async function dentistsCountBySubscription(db) {
  return db
    .collection('users')
    .find({ role: 0, paymentVerified: true })
    .count();
}

export async function listDentists(db, startDate) {
  console.log(startDate, 'startDate');
  return db
    .collection('users')
    .find(
      {
        role: 0,
        create_at: {
          $gte: startDate,
        },
      }
      // {
      //   $lookup: {
      //     from: "courses",
      //     localField: "courses",
      //     foreignField: "_id",
      //     as: "courses",
      //   },
      // },
    )
    .toArray();
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
}
