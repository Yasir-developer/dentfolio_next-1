import DentistTabs from "@/components/DentistTabs/DentistTabs";
import CreateCasePage from "@/page-components/CreateCasePage";
import React from "react";

const createCase = () => {
  return (
    <div className="dentistBodyStyles bg-white">
      <DentistTabs>
        <CreateCasePage />
      </DentistTabs>
    </div>
  );
};

export default createCase;
