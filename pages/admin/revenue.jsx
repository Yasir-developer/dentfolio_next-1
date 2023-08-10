import AdminTabs from "@/components/AdminTabs/AdminTabs";
import AdminDentistPage from "@/page-components/AdminDentistPage";
import OverviewPage from "@/page-components/OverviewPage";
import RevenuePage from "@/page-components/RevenuePage";
import React from "react";

const revenue = () => {
  return (
    <div>
      <div className="dentistBodyStyles">
        <AdminTabs>
          <RevenuePage />
        </AdminTabs>
      </div>
    </div>
  );
};

export default revenue;
