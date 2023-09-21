import { ButtonLink } from '@/components/Button';
import { Container, Spacer, Wrapper } from '@/components/Layout';
import { Text } from '@/components/Text';
import Link from 'next/link';
import styles from './VerifyEmail.module.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { paymentModal } from 'redux/actions/auth';
import BlueButtons from '@/components/Buttons/BlueButtons';
import AppHeader from '@/components/Header/Header';

export const VerifyEmail = ({ valid }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (valid) {
      dispatch(paymentModal(true));
    }
  }, []);
  return (
    <Wrapper className={styles.root}>
      {/* <AppHeader /> */}
      <Container column alignItems="center">
        <Text
          className={styles.text}
          color={valid ? 'success-light' : 'secondary'}
        >
          {valid
            ? 'Thank you for verifying your email address. You may close this page and Continue to Subscription Payment process.'
            : 'It looks like you may have clicked on an invalid link. Please close this window and try again.'}
        </Text>
        <Spacer size={4} axis="vertical" />
        <Link href="/login" passHref>
          {valid ? <BlueButtons buttonText={'Continue to Login'} /> : ''}
        </Link>
      </Container>
    </Wrapper>
  );
};
