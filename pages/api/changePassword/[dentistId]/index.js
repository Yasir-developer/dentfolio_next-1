// // // import { getStudentById } from "@/api-lib/db";
// // // import { auths, database, validateBody } from "@/api-lib/middlewares";
// // import db from "../../../../db";
// // // import { ncOpts } from "../../../../../api-lib/nc";

// // import nc from "next-connect";
// // import { getDentistById } from "../../../../../api-lib/db/dentist";

// // // const handler = nc(ncOpts);

// // // handler.use(db);

// // // handler.get(async (req, res) => {
// // //   console.log(res, "res");

// // // });

// // // try {
// // // const { db } = await connectToDatabase();

// // // Retrieve the user profile from the database
// // // const users = db.collection('users');
// // // const user = await users.findOne({ _id: userId });
// // export default async function handler(req, res) {
// //   const dentist = await getDentistById(db, req.query.dentistId);
// //   res.json({ dentist });
// // }
// // //     if (!user) {
// // //       return res.status(404).json({ message: 'User not found' });
// // //     }

// // //     // Return the user profile data
// // //     return res.status(200).json({ user });
// // //   } catch (error) {
// // //     return res.status(500).json({ message: 'Internal server error' });
// // //   }
// // // }
// // // export default handler;

// import { connectToDatabase } from "../../../../db";
// import { ObjectId } from "mongodb";
// import { v2 as cloudinary } from "cloudinary";
// cloudinary.config({
//   cloud_name: "dtnbj2pa5",
//   api_key: "583939563285816",
//   api_secret: "I3JfU0SaBa-ez9Noq2QwSoJCW30",
// });
// export default async function handler(req, res) {
//   //   if (req.method !== "GET") {
//   //     return res.status(405).json({ message: "Method not allowed" });
//   //   }

//   console.log(req.query, "req.query");
//   if (req.method === "GET") {
//     const { dentistId } = req.query; // Assuming the ID is provided as a query parameter
//     console.log(dentistId, "id-------");
//     try {
//       const { db } = await connectToDatabase();

//       // Retrieve the user profile from the database
//       const users = db.collection("users");
//       const user = await users.findOne({ _id: new ObjectId(dentistId) });
//       console.log(users, "user user");
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       // Return the user profile data
//       return res.status(200).json({ user });
//     } catch (error) {
//       console.log(error, "error ----");
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   } else if (req.method === "PUT") {
//     const { dentistId } = req.query; // Assuming the ID is provided as a query parameter
//     const {
//       firstName,
//       lastName,
//       userName,

//       displayName,
//       gdcNo,
//       buildingName,
//       streetName,
//       city,
//       postCode,
//       bio,
//       phone,
//       courtesyTitle,
//       profile_photo,
//       treatment_type,
//       previous_case,
//       image,
//     } = req.body;
//     console.log(image, "image");
//     try {
//       // console.log(req.files, "req.files");
//       // const imageFile = req.files;
//       // // "https://www.kindpng.com/imgv/ioJmwwJ_dummy-profile-image-jpg-hd-png-download/",
//       // //
//       // const uploadedImage = await cloudinary.uploader.upload(image, {
//       //   folder: "profile_image", // Specify the folder in Cloudinary to store the images
//       //   // format: "jpg", // Specify the desired image format
//       //   // transformation: [{ width: 300, height: 300, crop: "limit" }], // Apply any desired image transformations
//       // });

//       // const { secure_url: imageUrl, public_id: imagePublicId } = uploadedImage;
//       const { db } = await connectToDatabase();

//       // Update the user profile in the database
//       const users = db.collection("users");
//       const updatedUser = await users.findOneAndUpdate(
//         { _id: new ObjectId(dentistId) },
//         {
//           $set: {
//             firstName,
//             lastName,
//             userName,

//             displayName,
//             gdcNo,
//             buildingName,
//             streetName,
//             city,
//             postCode,
//             phone: phone ? phone : "",
//             bio: bio ? bio : "",
//             courtesyTitle: courtesyTitle ? courtesyTitle : "",
//             profile_photo: profile_photo ? profile_photo : "",
//             treatment_type: treatment_type ? treatment_type : [],
//             previous_case: previous_case ? previous_case : [],
//             image,
//             // imageUrl,
//             // imagePublicId,
//           },
//         },
//         { returnDocument: "after" }
//         // { new: true },
//         // (err, doc) => {
//         //   if (err) {
//         //     console.log("Something wrong when updating data!");
//         //   }

//         //   console.log(doc, "my updated doc");
//         // }
//       );

//       if (!updatedUser.value) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       // Return the updated user profile
//       const updatedProfile = updatedUser.value;

//       return res
//         .status(200)
//         .json({ message: "Updated Sucessfully", user: updatedProfile });
//     } catch (error) {
//       console.log(error, "edit error ----");

//       return res.status(500).json({ message: "Internal server error" });
//     }
//   } else {
//     return res.status(405).json({ message: "Method not allowed" });
//   }
// }

// import { getDentistById } from '@/api-lib/db';
import { changePassword, getDentistById } from '@/api-lib/db';
import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

handler.post(async (req, res) => {
  // ...auths,
  // console.log(userId, 'userId request');
  console.log(req.query.dentistId, 'req.query');
  console.log(req.body.email, 'req.body.email');
  console.log(req.body.password, 'req.body.email');
  // return;
  const changed_pass = await changePassword(req.db, {
    email: req.body.email,
    password: req.body.password,
    dentistId: req.query.dentistId,
  });
  res.json({ changed_pass });

  // const user = await getDentistById(req.db, req.query.dentistId);
  // console.log(dentist, 'teacher');
  // res.json({ user });
  // return;
});

export default handler;
