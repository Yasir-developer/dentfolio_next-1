import {
  getCaseByDentistId,
  getTeacherById,
  insertCase,
  getCases,
  // insertPost,
} from '@/api-lib/db';
import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

handler.post(
  ...auths,
  // validateBody({
  //   type: 'object',
  //   properties: {
  //     content: ValidateProps.post.content,
  //   },
  //   required: ['content'],
  //   additionalProperties: false,
  // }),
  async (req, res) => {
    // console.log(req.db, '==== req ===');
    // const userId = req.user?.userId;
    // console.log(userId, 'userId request');
    // if (!req.user) {
    //   return res.status(401).end();
    // }

    // console.log(req.user._id,'req.user._id')
    const cases = await insertCase(req.db, {
      case_title: req.body.title,
      description: req.body.description,
      caseType: req.body.tags,
      visibility: req.body.selectedOption == 'public' ? 1 : 0,
      dentistId: req.user._id,
    });

    return res.json({ cases });
  }
);
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
