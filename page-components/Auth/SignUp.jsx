// import { Button } from '@/components/Button';
// import { Input } from '@/components/Input';
// import { Container, Spacer, Wrapper } from '@/components/Layout';
// import { TextLink } from '@/components/Text';
// import { fetcher } from '@/lib/fetch';
// import { useCurrentUser } from '@/lib/user';
import Image from 'next/image';
// import Image from 'next/future/image';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './Auth.module.css';
import logo from '../../public/images/loginLogo.svg';
import logoWhite from '../../public/images/logoWhite.png';
import logotwo from '../../public/images/logo.png';
import BlueButtons from '@/components/Buttons/BlueButtons';
import AuthInput from '@/components/Inputs/AuthInput';
import Router from 'next/router';

import Checkbox from '@/components/Checkbox/Checkbox';
import axios from 'axios';
import { mutate } from 'swr';
// const SignUp = () => {
//   const emailRef = useRef();
//   const passwordRef = useRef();
//   const usernameRef = useRef();
//   const nameRef = useRef();

//   const { mutate } = useCurrentUser();

//   const [isLoading, setIsLoading] = useState(false);

//   const router = useRouter();

//   const onSubmit = useCallback(
//     async (e) => {
//       e.preventDefault();
//       try {
//         setIsLoading(true);
//         const response = await fetcher('/api/users', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             email: emailRef.current.value,
//             name: nameRef.current.value,
//             password: passwordRef.current.value,
//             username: usernameRef.current.value,
//           }),
//         });
//         mutate({ user: response.user }, false);
//         toast.success('Your account has been created');
//         router.replace('/feed');
//       } catch (e) {
//         toast.error(e.message);
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [mutate, router]
//   );

//   return (
//     <Wrapper className={styles.root}>
//       <div className={styles.main}>
//         <h1 className={styles.title}>Join Now</h1>
//         <form onSubmit={onSubmit}>
//           <Container alignItems="center">
//             <p className={styles.subtitle}>Your login</p>
//             <div className={styles.seperator} />
//           </Container>
//           <Input
//             ref={emailRef}
//             htmlType="email"
//             autoComplete="email"
//             placeholder="Email Address"
//             ariaLabel="Email Address"
//             size="large"
//             required
//           />
//           <Spacer size={0.5} axis="vertical" />
//           <Input
//             ref={passwordRef}
//             htmlType="password"
//             autoComplete="new-password"
//             placeholder="Password"
//             ariaLabel="Password"
//             size="large"
//             required
//           />
//           <Spacer size={0.75} axis="vertical" />
//           <Container alignItems="center">
//             <p className={styles.subtitle}>About you</p>
//             <div className={styles.seperator} />
//           </Container>
//           <Input
//             ref={usernameRef}
//             autoComplete="username"
//             placeholder="Username"
//             ariaLabel="Username"
//             size="large"
//             required
//           />
//           <Spacer size={0.5} axis="vertical" />
//           <Input
//             ref={nameRef}
//             autoComplete="name"
//             placeholder="Your name"
//             ariaLabel="Your name"
//             size="large"
//             required
//           />
//           <Spacer size={1} axis="vertical" />
//           <Button
//             htmlType="submit"
//             className={styles.submit}
//             type="success"
//             size="large"
//             loading={isLoading}
//           >
//             Sign up
//           </Button>
//         </form>
//       </div>
//       <div className={styles.footer}>
//         <Link href="/login" passHref>
//           <TextLink color="link" variant="highlight">
//             Already have an account? Log in
//           </TextLink>
//         </Link>
//       </div>
//     </Wrapper>
//   );
// };

const SignUp = () => {
  // console.log(server, "server");
  const [loader, setLoader] = useState(false);

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [gdcNo, setGdcNo] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const [streetName, setStreetName] = useState('');
  const [city, setCity] = useState('');
  const [postCode, setPostCode] = useState('');

  const router = useRouter();

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setLoader(true);
        // setIsLoading(true);
        const response = await fetcher('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            // name: nameRef.current.value,
            password: password,
            firstName,
            lastName,
            userName,

            displayName,
            gdcNo,
            buildingName,
            streetName,
            city,
            postCode,
            // username: usernameRef.current.value,
          }),
        });
        console.log(response, 'response -------');
        mutate({ user: response.user }, false);
        toast.success('Your account has been created');
        router.replace('/dentist/view-profile');
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoader(false);
      }
    },
    [mutate, router]
  );

  // const handleRegistration = (e) => {
  //   e.preventDefault();
  //   setLoader(true);
  //   const finalData = {
  //     email,
  //     password,
  //     firstName,
  //     lastName,
  //     displayName,
  //     gdcNo,
  //     buildingName,
  //     streetName,
  //     city,
  //     postCode,
  //   };

  //   // return;
  //   const options = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   };

  //   console.log(finalData, 'final data');

  //   axios
  //     .post(`${server}/api/signup/`, finalData, options)
  //     .then((res) => {
  //       console.log(res, 'job post response..');
  //       if (res.status == 201) {
  //         setLoader(false);
  //         toast.success('Signup Successfully', {
  //           position: 'top-center',
  //           autoClose: 2000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //         });
  //         Router.replace('/dentist/view-profile');
  //       } else if (res.status == 400) {
  //         setLoader(false);
  //         toast.error(res.errors[0], {
  //           position: 'top-center',
  //           autoClose: 2000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       setLoader(false);
  //       if (error?.response?.data?.errors[0]) {
  //         toast.error(error?.response?.data?.errors[0], {
  //           position: 'top-center',
  //           autoClose: 2000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //         });
  //       } else {
  //         setLoader(false);
  //         toast.error(error?.response?.data?.message, {
  //           position: 'top-center',
  //           autoClose: 2000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //         });
  //       }
  //     });
  // };

  const handleTermsChange = () => {
    setTermsAccepted(!termsAccepted);
  };

  const handlePrivacyChange = () => {
    setPrivacyAccepted(!privacyAccepted);
  };

  return (
    <div className="lg:w-full h-full flex flex-col lg:flex-row bg-[#F9FBFC] max-h-[100vh] 4xl:min-h-[100vh] ">
      <div className="lg:w-[40%] lg:py-[0px] py-[30px]  bg-gradient-radial from-[#0372E2] to-[#0B5FB4] justify-center flex items-center text-center">
        <Image src={logo} alt="logo" className="mx-auto hidden lg:block" />

        <Image src={logoWhite} alt="logo" className="mx-auto lg:hidden" />
      </div>
      <div className="lg:w-[60%] flex flex-col justify-between rounded-[7px] overflow-y-scroll">
        <div className="flex flex-col items-center justify-center m-5 4xl:h-full">
          <div className="w-[100%] m-auto bg-transparent flex flex-col justify-around">
            {/* <div className="w-[50%] h-[50%]"> */}
            <Image
              className="mx-auto hidden lg:block lg:mt-[20px]"
              alt="logo"
              width={150}
              height={150}
              src={'/images/logo.png'}
            />
            {/* </div> */}
            <h2 className="my-8 text-center font-semibold text-[32px] md:text-4xl text-custom-black">
              Sign Up
            </h2>
            <form
              // onSubmit={
              onSubmit={onSubmit}
              // e.preventDefault();
              // handleRegistration(e);
              // Router.replace("/dentist/view-profile");
              // }
            >
              <div className="w-full flex flex-wrap gap-x-2 lg:gap-x-7 gap-y-2 items-center justify-center">
                <AuthInput
                  placeholder={'First Name'}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <AuthInput
                  placeholder={'Last Name'}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />

                <AuthInput
                  placeholder={'Email Address'}
                  className={'w-[92.5%] lg:w-[45%]'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {/* <AuthInput
                  placeholder={'Display Name'}
                  className={'w-[92.5%] lg:w-[45%]'}
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                /> */}
                <AuthInput
                  placeholder={'Password'}
                  type={'password'}
                  // className={"!w-[45%]"}
                  containerClassName={'!w-[45%]'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <AuthInput
                  placeholder={'GDC Number'}
                  value={gdcNo}
                  onChange={(e) => setGdcNo(e.target.value)}
                />
                <AuthInput
                  placeholder={'Practice Building number/ Name'}
                  value={buildingName}
                  onChange={(e) => setBuildingName(e.target.value)}
                />
                <AuthInput
                  placeholder={'Practice Street Name'}
                  value={streetName}
                  onChange={(e) => setStreetName(e.target.value)}
                />
                <AuthInput
                  placeholder={'Practice City'}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <AuthInput
                  placeholder={'Practice Post Code'}
                  value={postCode}
                  onChange={(e) => setPostCode(e.target.value)}
                />
              </div>

              <div className="flex flex-col mx-[20px] my-[40px]">
                <Checkbox
                  label=" I agree to the website terms & conditions
                  "
                  checked={termsAccepted}
                  onChange={handleTermsChange}
                />
                <Checkbox
                  label="I have valid consent from my patients to republish/use/share photographs uploaded to Dentfolio"
                  checked={privacyAccepted}
                  onChange={handlePrivacyChange}
                />
              </div>

              <div className="mt-5 flex flex-col items-center justify-center">
                <BlueButtons
                  loading={loader}
                  buttonText="Submit"
                  className="px-[50px] cursor-pointer"
                />

                <div className="py-4 px-6 text-center">
                  <p className="text-sm text-[#858585]">
                    Already have an account?{' '}
                    <a
                      // href="#"
                      className="text-custom-blue underline"
                      onClick={() => Router.push('/login')}
                    >
                      Sign in
                    </a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
