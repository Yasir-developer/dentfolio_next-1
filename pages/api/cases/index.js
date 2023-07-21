import {
  getCaseByDentistId,
  getTeacherById,
  insertCase,
  getCases,
  // insertPost,
} from '@/api-lib/db';
import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
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

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
  });
}

handler.use(database);
const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    // Reject a file if it is not an image
    cb(new Error('Only images are allowed!'), false);
  } else {
    cb(null, true);
  }
};
handler.post(
  upload.single('cases_photo', 3),
  // console.log(upload, 'upload=='),

  ...auths,

  async (req, res) => {
    var path = [];
    // let path = [];
    console.log(req.files, 'req.files====');
    if (req.files) {
      const uploadPromises = req.files.map((element) => {
        return cloudinary.uploader.upload(element.path, {
          width: 512,
          height: 512,
          crop: 'fill',
        });
      });

      Promise.all(uploadPromises)
        .then((results) => {
          console.log(results, 'rresults');
          path = results.map((res) => {
            console.log(res, 'path path');
            // path.push(res.secure_url);
          });
          let savePath = path;
          console.log(savePath, 'savepath');

          // console.log(path, '=======');

          // Do whatever you want with the 'path' array here, e.g., send it in the response.
        })
        .catch((error) => {
          console.error('Error uploading images:', error);
          // Handle errors here
        });
    }
    // req.files.map((element) => {
    //   console.log(element, 'eq.file.path');
    //   const image = cloudinary.uploader
    //     .upload(element.path, {
    //       width: 512,
    //       height: 512,
    //       crop: 'fill',
    //     })
    //     .then((res) => {
    //       console.log(res.secure_url, 'response secure urls ====');
    //       path.push(res.secure_url);
    //     });

    //   console.log(path, 'path after pushed array');
    // });

    // path = image.secure_url;
    // console.log(path, 'my path');

    // }
    // return;
    console.log(path, 'before const =======');
    const cases = await insertCase(req.db, {
      case_title: req.body.title,
      description: req.body.description,
      caseType: req.body.tags,
      visibility: req.body.selectedOption == 'public' ? 1 : 0,
      dentistId: req.user._id,
      cases_photo: path,
    });
    console.log(path, 'after const =======');
    return res.json({ cases });
  }
);

export const config = {
  api: {
    bodyParser: false,
  },
};
handler.get(
  ...auths,

  async (req, res) => {
    const getCase = await getCases(req.db, {
      dentistId: req.user._id,
    });
    return res.json({ getCase });
  }
);
export default handler;
