import React, { useEffect, useState } from 'react';
import SettingsStyles from "./SettingsPageStyles";
import MainSettings from "./components/MainSettings/MainSettings";
import LearnWordSettings from "./components/LearnWordsSettings/LearnWordSettings";

const SettingsPage: React.FC = () => {
  const useStyles = SettingsStyles();

  return (
    <div className={useStyles.settingsPageContainer}>
       <MainSettings />
       <LearnWordSettings/>
    </div>
   );
};

export default SettingsPage;
