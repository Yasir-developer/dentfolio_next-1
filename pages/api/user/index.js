import { ValidateProps } from '@/api-lib/constants';
import { findUserByUsername, updateUserById } from '@/api-lib/db';
import { auths, database, validateBody } from '@/api-lib/middlewares';
// import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import { slugUsername } from '@/lib/user';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import nc from 'next-connect';

const upload = multer({ dest: '/tmp' });
const handler = nc(ncOpts);

if (process.env.CLOUDINARY_URL) {
  const {
    hostname: cloud_name,
    username: api_key,
    password: api_secret,
  } = new URL(process.env.CLOUDINARY_URL);
  // console.log(cloud_name, 'cloud_name');
  // console.log(api_key, 'api_key');
  // console.log(api_secret, 'api_secret');

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
  });
}

handler.use(database, ...auths);

handler.get(async (req, res) => {
  if (!req.user) return res.json({ user: null });
  return res.json({ user: req.user });
});

handler.patch(
  upload.single('profile_photo'),
  // validateBody({
  //   type: 'object',
  //   properties: {
  //     username: ValidateProps.user.username,
  //     name: ValidateProps.user.name,
  //     bio: ValidateProps.user.bio,
  //   },
  //   additionalProperties: true,
  // }),
  async (req, res) => {
    // if (!req.user) {
    //   req.status(401).end();
    //   return;
    // }

    // const db = await getMongoDb();

    let path;
    console.log(path, 'path========');
    if (req.file) {
      console.log(req.file.path, 'req.file=======');
      const image = await cloudinary.uploader.upload(req.file.path, {
        width: 512,
        height: 512,
        crop: 'fill',
      });
      path = image.secure_url;
      console.log(path, 'my path');
    }
    const {
      firstName,
      lastName,
      userName,

      displayName,
      gdcNo,
      buildingName,
      streetName,
      city,
      postCode,
      bio,
      phone,
      courtesyTitle,

      profile_photo,
      location,
      treatment_type,
      previous_case,
      latitude,
      longitude,
    } = req.body;

    let username;

    if (req.body.username) {
      username = slugUsername(req.body.username);
      if (
        username !== req.user.username &&
        (await findUserByUsername(db, username))
      ) {
        res
          .status(403)
          .json({ error: { message: 'The username has already been taken.' } });
        return;
      }
    }

    const user = await updateUserById(
      // req.db,
      req.db,
      req.body.id ? req.body.id : req.user._id,
      {
        // ...(username && { username }),

        ...(firstName && { firstName }),
        ...(userName && { userName }),
        ...(displayName && { displayName }),
        // ...(payment && { previous_case }),

        ...(gdcNo && { gdcNo }),
        ...(buildingName && { buildingName }),
        ...(streetName && { streetName }),
        ...(latitude && { latitude }),
        ...(longitude && { longitude }),
        ...(location && { location: JSON.parse(location) }),
        // location: [longitude, latitude],

        ...(city && { city }),
        ...(postCode && { postCode }),
        ...(phone && { phone }),
        ...(courtesyTitle && { courtesyTitle }),

        ...(req?.file?.path && { profile_photo: path }),
        ...(treatment_type && { treatment_type: JSON.parse(treatment_type) }),
        ...(previous_case && { previous_case }),
        // ...(previous_case && { previous_case }),

        // ...(c && { previous_case }),

        ...(typeof bio === 'string' && { bio }),
        // ...(profilePicture && { profilePicture }),
      }
    );
    console.log(user, 'user');
    res.json({ user });
  }
);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
