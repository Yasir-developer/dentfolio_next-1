import AdminTabs from "@/components/AdminTabs/AdminTabs";
import AdminDentistPage from "@/page-components/AdminDentistPage";
import OverviewPage from "@/page-components/OverviewPage";
import React from "react";

const overview = () => {
  return (
    <div>
      <div className="dentistBodyStyles bg-gray-100">
        <AdminTabs>
          <AdminDentistPage />
        </AdminTabs>
      </div>
    </div>
  );
};

export default overview;
