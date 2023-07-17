import React from "react";
import SimpleButton from "@/components/Buttons/SimpleButton";
import Image from "next/image";
const StripeCard = ({
  cardIcon,
  cardType,
  endingNumber,
  isPrimary = false,
}) => {
  return (
    <div className="">
      <div className="flex gap-x-2 my-3 items-center lg:py-0 py-3">
        {/* <div className="cardIcon">{cardIcon}</div> */}
        <Image src={cardIcon} width={50} height={50} />
        <div className="cardEndingNumber">
          {cardType} ending in {endingNumber}
        </div>
      </div>
      <div className="flex gap-x-3 justify-end">
        <SimpleButton text={"Edit"} className={"border-r"} />
        {isPrimary && (
          <SimpleButton text={"Set as primary"} className={"border-r"} />
        )}
        <SimpleButton text={"Remove"} className={"text-red-300"} />
      </div>
    </div>
  );
};

export default StripeCard;
