import { useState } from "react";
import DentistTabs from "@/components/DentistTabs/DentistTabs";

import SettingsPage from "@/page-components/SettingsPage";
import AdminTabs from "@/components/AdminTabs/AdminTabs";

const Dashboard = () => {
  return (
    <div className="dentistBodyStyles">
      <AdminTabs>
        <SettingsPage />
      </AdminTabs>
    </div>
  );
};

export default Dashboard;
