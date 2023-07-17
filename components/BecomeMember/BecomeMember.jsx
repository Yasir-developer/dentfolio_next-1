import Image from "next/image";
import React from "react";
import doctor from "../../../public/images/doctor.png";
import Router from "next/router";

// import Become from "../../../public/images/member.png";

const BecomeMember = () => {
  return (
    // <div className="w-full">
    //   <div
    //     style={{
    //       backgroundImage: `url(/images/member.png)`,
    //       backgroundRepeat: "no-repeat",
    //       backgroundSize: "cover",
    //     }}
    //   >
    //     <div className="sizingStyles py-[50px] pr-[60px] pl-[60px] flex justify-between items-center">
    //       <div className="w-[60%]">
    //         <h3 className="text-[18px] font-normal text-white">
    //           ARE YOU A DENTIST?
    //         </h3>
    //         <h1 className="flex items-center text-white font-poppins font-bold text-[41px]">
    //           BECOME A MEMBER NOW
    //         </h1>
    //         <h3 className="text-[14px] font-light text-white mt-3">
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
    //           congue, sapien non efficitur sollicitudin, ex risus semper diam,
    //           sed ornare.
    //         </h3>

    //         <button className="bg-transparent border font-medium border-white text-white py-2 px-[60px] mt-10 rounded w-139 text-sm">
    //           Find Out More{" "}
    //         </button>
    //       </div>
    //       <div className="w-[50%]">
    //         <Image src={doctor} />
    //       </div>
    //     </div>

    //     {/* <Image src={Become} className='w-full'/> */}
    //     {/* <div style={{ position: 'absolute', top: '30%', left: '10%',  }}>
    //     <h3 className='text-[18px] font-medium'>ARE YOU A DENTIST?</h3>
    //     <h1>BECOME A MEMBER NOW</h1>
    //   </div> */}

    //     {/* <h1>jxjkasxajx</h1> */}
    //   </div>
    // </div>

    <div className="w-full">
      <div
        style={{
          backgroundImage: `url(/images/member.png)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="sizingStyles lg:py-28 py-[28px] px-6 md:px-12 lg:px-20 flex flex-col md:flex-row justify-between items-center">
          <div className="w-full md:w-[60%]">
            <h3 className="text-[18px] text-center lg:text-left font-normal text-white">
              ARE YOU A DENTIST?
            </h3>
            <h1 className=" text-white lg:text-left text-center font-poppins font-bold lg:text-[41px] text-[21px]">
              BECOME A MEMBER NOW
            </h1>
            <h3 className="text-[14px] lg:text-left text-center font-normal text-white mt-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              congue, sapien non efficitur sollicitudin, ex risus semper diam,
              sed ornare.
            </h3>
            <button
              onClick={() => Router.push("/dentist/dentist-plan")}
              className="bg-transparent border font-medium  flex items-center justify-center lg:text-left text-center border-white text-white mx-auto lg:ml-0 py-2 px-8 md:px-12 lg:px-16 lg:mt-10 mt-5 rounded text-sm"
            >
              Find Out More
            </button>
          </div>
          <div className="w-full md:w-[50%] mt-8 md:mt-0">
            <Image src={doctor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeMember;
