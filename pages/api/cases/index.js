import {
  getCaseByDentistId,
  getTeacherById,
  insertCase,
  getCases,
  updateCaseById
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
  upload.single('cases_photo'),

  ...auths,

  async (req, res) => {
    console.log(req.files, 'req.files cases ');
    //Multiple Work
    // try {
    //   if (req.files) {
    //     const uploadPromises = req?.files?.cases_photo?.map((element) => {
    //       return cloudinary.uploader.upload(element.path, {
    //         width: 512,
    //         height: 512,
    //         crop: 'fill',
    //       });
    //     });

    //     const results = await Promise.all(uploadPromises);
    //     results.map((res) => {
    //       savePath.push(res.secure_url);
    //     });

    //   }

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
    // return;
    const cases = await insertCase(req.db, {
      case_title: req.body.title,
      description: req.body.description,
      caseType: req.body.tags,
      visibility: req.body.selectedOption == 'public' ? 1 : 0,
      dentistId: req.user._id,
      cases_photo: path,
    });
    console.log(cases, 'after const =======');
    // savePath = [];
    return res.json({ cases });
  }
  // console.log(err)
);

handler.patch(
  upload.single('cases_photo'),

  async (req, res) => {
    if(!req.body.id){
      return res.status(400).json({error:'Case ID not found'})
    }
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

    // console.log(req.body)
    const {
      id,
      dentistId,
      title,
      description,
      tags,
      selectedOption,
    } = req.body;
    // console.log(dentistId)
    // console.log(id)
    // console.log(title)
    // console.log(description)
    // console.log(tags)
    // console.log(selectedOption)
    console.log(path)

    const caseUpdate = await updateCaseById(
      // req.db,
      req.db,
      req.body.id ? req.body.id : '',
      {
        // ...(username && { username }),
        ...(title && { case_title:title }),
        ...(description && { description }),
        ...(tags && { caseType:tags }),
        ...(selectedOption && { visibility: selectedOption == 'public' }),
        ...(path && { cases_photo:path }),
      }
    );
    console.log(caseUpdate, 'caseUpdate');
    res.json({ caseUpdate });
  }
)
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
