import { useRouter } from 'next/router';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
// import { Form, Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
// import { TeacherRegDetails } from 'store/HeaderData/action';
// import { Button } from '../Button';
// import styles from './EmailModal.module.css';

const EmailModal = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleClose = () => {
    // dispatch(TeacherRegDetails(""));
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [isLoading, setIsLoading] = useState(false);
  //   const { teacher } = useSelector((state) => state.Reducer);
  //  console.log(
  //   useSelector((state) => state.Reducer),
  //   "useSelector((state) => state.Reducer) email modal"
  // );
  useImperativeHandle(ref, () => ({
    openEmailModal() {
      setShow(true);
    },
  }));

  //   const onResend = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch(
  //         `/api/user/email/resend?id=${props?.user?._id}&email=${props?.user?.email}&name=${props?.user?.name}`,
  //         {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //         }
  //       );
  //       // console.log(response, "response for email verify");
  //       toast.success("Email has been sent");
  //     } catch (e) {
  //       toast.error(e.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  return (
    // <Modal className="modal_terms_conditions" show={show} onHide={handleClose}>
    //   <Modal.Header>
    //     <Modal.Title className={styles.terms_condition_title}>
    //       Email Confirmation Sent
    //     </Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body className="terms_condition_body">
    //     <div className="terms_condition_fields">
    //       <div className={styles.terms_condition_information}>
    //         <p>
    //           An Email Confirmation Has Been Sent To The Address Provided. If
    //           You Don't Receive This In A Few Minutes,
    //         </p>
    //         <p>
    //           Please Confirm Your Email Address Below And Resend The
    //           Confirmation Email.
    //         </p>
    //         <p className={styles.terms_condition_email}>{teacher.email}</p>
    //         <p className={styles.condition_not_email}>Not your Email?</p>
    //       </div>
    //       <Form>
    //         <div className="row">
    //           <Button
    //             variant="primary"
    //             className={`col ${styles.blue_btn}`}
    //             onClick={(e) => {
    //               e.preventDefault();
    //               onResend();
    //             }}
    //             loading={isLoading}
    //           >
    //             Resend Email
    //           </Button>
    //           <Button
    //             variant="primary"
    //             className={`col ${styles.red_modal_btn}`}
    //             onClick={(e) => {
    //               e.preventDefault();
    //               handleClose();
    //               router.replace("/");
    //             }}
    //           >
    //             Done
    //           </Button>
    //         </div>
    //       </Form>
    //     </div>
    //   </Modal.Body>
    // </Modal>

    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-[999]">
      <div className="bg-white p-8 rounded shadow-lg">
        <p>Email Confirmation Sent</p>

        <p>An Email Confirmation Has Been Sent To The Address Provided.</p>
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 mr-2 bg-custom-blue text-white rounded hover:bg-sky-500"
            onClick={() => handleClose()}
            // onClick={confirmDelete} // Call confirmDelete when confirmed
          >
            OK
          </button>
          {/* <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            // onClick={cancelDelete} // Call cancelDelete when canceled
          >
            Cancel
          </button> */}
        </div>
      </div>
    </div>
  );
});

export default EmailModal;
