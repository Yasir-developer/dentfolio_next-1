import DentistTabs from "@/components/DentistTabs/DentistTabs";
import EditProfilePage from "@/page-components/EditProfilePage";
import React from "react";

const editProfile = () => {
  return (
    <div className="dentistBodyStyles">
      <DentistTabs>
        <EditProfilePage />
      </DentistTabs>
    </div>
  );
};

export default editProfile;
