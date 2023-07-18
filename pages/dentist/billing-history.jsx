import DentistTabs from "@/components/DentistTabs/DentistTabs";
import BillingHistory from "@/page-components/BillingHistory";
import React from "react";

const billinghistory = () => {
  return (
    <div className="dentistBodyStyles">
      <DentistTabs>
        <BillingHistory />
      </DentistTabs>
    </div>
  );
};

export default billinghistory;
