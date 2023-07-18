import { useState } from "react";
import DentistTabs from "@/components/DentistTabs/DentistTabs";

import SettingsPage from "@/page-components/SettingsPage";

const Dashboard = () => {
  return (
    <div className="dentistBodyStyles">
      <DentistTabs>
        <SettingsPage />
      </DentistTabs>
    </div>
  );
};

export default Dashboard;
