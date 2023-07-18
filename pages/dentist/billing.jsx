import DentistTabs from "@/components/DentistTabs/DentistTabs";
import BillingPage from "@/page-components/BillingPage";
import CreateCasePage from "@/page-components/CreateCasePage";
import React from "react";

const Billing = () => {
  return (
    <div className="dentistBodyStyles">
      <DentistTabs>
        <BillingPage />
      </DentistTabs>
    </div>
  );
};

export default Billing;
