import AdminTabs from "@/components/AdminTabs/AdminTabs";
import AdminDentistPage from "@/page-components/AdminDentistPage";
import OverviewPage from "@/page-components/OverviewPage";
import React from "react";

const dentist = () => {
  return (
    <div>
      <div className="dentistBodyStyles">
        <AdminTabs>
          <AdminDentistPage />
        </AdminTabs>
      </div>
    </div>
  );
};

export default dentist;
