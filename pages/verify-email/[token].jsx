import { findAndDeleteTokenByIdAndType, updateUserById } from '@/api-lib/db';
import { database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import { VerifyEmail } from '@/page-components/VerifyEmail';
import nc from 'next-connect';
import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { addTitle } from 'store/HeaderData/action';

export default function EmailVerifyPage({ valid }) {
  const dispatch = useDispatch();
  // const { title, description } = useSelector((state) => state.Reducer.title);
  // useEffect(() => {
  //   dispatch(addTitle({ title: "Email Verification", description: valid ? "Thank you for verifying your email address" : "you may have clicked on an invalid link" }))
  //   return () => {
  //   }
  // }, [title, description])
  return (
    <>
      <Head>
        <title>Email verification</title>
      </Head>
      <VerifyEmail valid={valid} />
    </>
  );
}

export async function getServerSideProps(context) {
  const handler = nc(ncOpts);
  handler.use(database);
  await handler.run(context.req, context.res);

  const { token } = context.params;

  const deletedToken = await findAndDeleteTokenByIdAndType(
    context.req.db,
    token,
    'emailVerify'
  );

  if (!deletedToken) return { props: { valid: false } };

  await updateUserById(context.req.db, deletedToken.creatorId, {
    emailVerified: true,
  });

  return { props: { valid: true } };
}
