import {
  getCaseByDentistId,
  getTeacherById,
  insertCase,
  getCases,
  updateCaseById,
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

handler.post(
  // upload.single('before_cases_photo'),
  // upload.single('after_cases_photo'),
  upload.fields([
    { name: 'before_cases_photo', maxCount: 1 },
    { name: 'after_cases_photo', maxCount: 1 },
  ]),

  ...auths,

  async (req, res) => {
    console.log(req.files.before_cases_photo, 'req.files cases ');
    console.log(req.files.after_cases_photo, 'req.files cases ');
    //Multiple Work
    //     try {
    //       if (req.files) {
    //         const uploadPromises = req?.files?.cases_photo?.map((element) => {
    //           return cloudinary.uploader.upload(element.path, {
    //             width: 512,
    //             height: 512,
    //             crop: 'fill',
    //           });
    //         });

    //         const results = await Promise.all(uploadPromises);
    //         results.map((res) => {
    //           savePath.push(res.secure_url);
    //         });

    //       }
    //     }catch(err){
    // console.log(err)
    //     };
    console.log('hereeeee');
    let path;
    let afterPath;
    // console.log(path, 'path========');
    console.log(req.files, 'req.files');
    // return;
    if (req.files) {
      // console.log(req.file.path, 'req.file=======');
      const image = await cloudinary.uploader.upload(
        req.files.before_cases_photo[0].path,
        {
          width: 1080,
          height: 512,
          crop: 'fill',
        }
      );
      const imageTwo = await cloudinary.uploader.upload(
        req.files.after_cases_photo[0].path,
        {
          width: 1080,
          height: 512,
          crop: 'fill',
        }
      );
      path = image.secure_url;
      afterPath = imageTwo.secure_url;
      console.log(path, 'path');
      console.log(afterPath, 'afterPath');

      // console.log(path, 'my path');
    }
    // retsurn;
    // return;
    const cases = await insertCase(req.db, {
      case_title: req.body.title,
      description: req.body.description,
      caseType: req.body.tags,
      visibility: req.body.selectedOption == 'public' ? 1 : 0,
      dentistId: req.user._id,
      before_cases_photo: path,
      after_cases_photo: afterPath,
    });
    // console.log(cases, 'after const =======');
    // savePath = [];
    return res.json({ cases });
  }
  // console.log(err)
);

handler.patch(
  upload.fields([
    { name: 'before_cases_photo', maxCount: 1 },
    { name: 'after_cases_photo', maxCount: 1 },
  ]),
  async (req, res) => {
    if (!req.body.id) {
      return res.status(400).json({ error: 'Case ID not found' });
    }
    let path;
    let afterPath;

    if (req.files) {
      // console.log(req.file.path, 'req.file=======');
      const image = await cloudinary.uploader.upload(
        req.files.before_cases_photo[0].path,
        {
          width: 1080,
          height: 512,
          crop: 'fill',
        }
      );
      const imageTwo = await cloudinary.uploader.upload(
        req.files.after_cases_photo[0].path,
        {
          width: 1080,
          height: 512,
          crop: 'fill',
        }
      );
      path = image.secure_url;
      afterPath = imageTwo.secure_url;
    }

    const { id, dentistId, title, description, tags, selectedOption } =
      req.body;

    const caseUpdate = await updateCaseById(
      // req.db,
      req.db,
      req.body.id ? req.body.id : '',
      {
        // ...(username && { username }),
        ...(title && { case_title: title }),
        ...(description && { description }),
        ...(tags && { caseType: tags }),
        ...(selectedOption && { visibility: selectedOption == 'public' }),
        ...(req?.files.before_cases_photo[0].path && {
          before_cases_photo: path,
        }),
        ...(req?.files?.after_cases_photo[0].path && {
          after_cases_photo: afterPath,
        }),
      }
    );

    res.json({ caseUpdate });
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
    // console.log(req.body, 'req.body.id');
    // console.log(req.query.id, 'console.log(');
    const cases = await getCases(req.db, {
      dentistId: req?.query?.id ? req?.query?.id : req?.body?.id,
    });
    return res.json({ cases });
  }
);
export default handler;
