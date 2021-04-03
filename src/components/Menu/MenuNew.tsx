import React from "react";
import Drawer from "@material-ui/core/Drawer";
import MenuStyles from "./MenuStyles";

const Menu: React.FC = () => {
  const useStyles = MenuStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className={""}></div>
    </div>
  );
};

export default Menu;
