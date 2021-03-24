import React, { useEffect, useState } from 'react';
import SettingsStyles from "./SettingsPageStyles";
import MainSettings from "./components/MainSettings/MainSettings";

const SettingsPage: React.FC = () => {
  const useStyles = SettingsStyles();

  useEffect(() => {

  }, [])

  return (
    <div className={useStyles.settingsPageContainer}>
       <MainSettings/>
    </div>
   );
};

export default SettingsPage;
