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
var savePath = [];

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
  // upload.array('cases_photo', 3),
  upload.fields([
    {
      name: 'cases_photo',
      maxCount: 3,
    },
  ]),
  // console.log(upload, 'upload=='),
  // upload.single('cases_photo1'),
  // upload.single('cases_photo2'),

  ...auths,

  async (req, res) => {
    // const path = [];
    // let path = [];
    console.log(req.files, 'req.files cases ');
    // return;
    // return;
    try {
      if (req.files) {
        const uploadPromises = req?.files?.cases_photo?.map((element) => {
          return cloudinary.uploader.upload(element.path, {
            width: 512,
            height: 512,
            crop: 'fill',
          });
        });
        // let savePath =[]

        const results = await Promise.all(uploadPromises);
        results.map((res) => {
          savePath.push(res.secure_url);
        });
        // .then((results) => {
        //   // console.log(results, 'rresults');
        //   results.map((res) => {
        //     //  savePath.push(res.secure_url)

        //     console.log(res, 'path path');
        //     savePath.push(res.secure_url);
        //     console.log(savePath, 'savePath');
        //   });
        // console.log(savePath, 'savepath');

        // console.log(path, '=======');

        // Do whatever you want with the 'path' array here, e.g., send it in the response.
        // })
      }

      console.log(savePath, 'before const =======');
      // return;
      const cases = await insertCase(req.db, {
        case_title: req.body.title,
        description: req.body.description,
        caseType: req.body.tags,
        visibility: req.body.selectedOption == 'public' ? 1 : 0,
        dentistId: req.user._id,
        cases_photo: savePath,
      });
      console.log(cases, 'after const =======');
      savePath = [];
      return res.json({ cases });
    } catch (err) {
      console.log(err, 'err');
    }
    // console.log(err)
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
    const cases = await getCases(req.db, {
      dentistId: req.user._id,
    });
    return res.json({ cases });
  }
);
export default handler;
