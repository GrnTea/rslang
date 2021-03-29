import React, { useState, useEffect } from "react";
import {AppBar, Toolbar, Typography, Button, ListItemProps} from "@material-ui/core";
import {Link, Link as RouterLink} from "react-router-dom";
import headerStyles from "./HeaderStyles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import MenuItem from "@material-ui/core/MenuItem";
import CloseIcon from '@material-ui/icons/Close';
import {log} from "util";



const buttonsData = [
 /* {
    label: "Главная",
    href: "/main",
  },*/
/*  {
    label: "Изучение",
    href: "/learning",
  },*/
  {
    label: "Словарь",
    href: "/dictionary",
  },
  {
    label: "Мини-игры",
    href: "/games",
  },
  {
    label: "Настройки",
    href: "/settings",
  },
  {
    label: "Статистика",
    href: "/statistics",
  },
  {
    label: "Команда",
    href: "/team",
  },
  {
    label: "Log In",
    href: "/login",
  },
];


function Header() {

  const { header, toolbar, logo, menuButton, list, listItem, menu, drawerContainer } = headerStyles();
  const [open, setOpen] = React.useState(true);

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false
  });
  const { mobileView, drawerOpen } = state;

  const handleClick = () => {
    setOpen(!open);
  };

  /*useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 800
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, []);*/

  const getMenuButtons = () => {
    return buttonsData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
            className: menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };


  const getDrawerChoices = () => {
    return buttonsData.map(({ label, href }) => {
      return (
        <Link
          to={href}
          key={label}
        >
          <MenuItem>{label}</MenuItem>
        </Link>
      );
    });
  };

  const displayMenu = () => {

    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));

    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    const getListItems = () => {
      function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
        return <ListItem button component="a" {...props} />;
      }

      return [1,2,3,4,5,6].map((listItem) => {
        return (
          <ListItemLink key={`k${listItem}`} href={`#textbook/section/${listItem}`}>
            <ListItemText primary={`Раздел ${listItem}`}/>
          </ListItemLink>
        );
      });
    };

    return (
      <Toolbar className={toolbar}>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <IconButton
            {...{
              onClick: handleDrawerClose,
            }}
          >
            <CloseIcon />
          </IconButton>

          <List className={list}>
            <ListItem button onClick={handleClick}>
              <ListItemText primary="Изучение" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {getListItems()}
              </List>
            </Collapse>
          </List>
          <div className={drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>
        <Typography variant="h5" component="h1" className={logo}>
          RS Lang
        </Typography>
      </Toolbar>
    );
  };

  const displayDesktop = () => {
    return (
    <Toolbar className={toolbar}>
      <Typography variant="h6" component="h1" className={logo}>
        RS Lang
      </Typography>
      <div className={menu}>
        {/*<List className={list}>*/}
        {/*<Button button onClick={handleClick}>
          "Изучение"
          {open ? <ExpandLess /> : <ExpandMore />}
        </Button>*/}
        <Collapse in={open} timeout="auto" unmountOnExit>

          {/*<Button>"Раздел 1"</Button>
          <Button>"Раздел 1"</Button>
          <Button>"Раздел 1"</Button>*/}
          {/*<List component="div" disablePadding>
            <ListItem button >
              <ListItemText primary="Раздел 1" />
            </ListItem>
            <ListItem button >
              <ListItemText primary="Раздел 1" />
            </ListItem>
            <ListItem button >
              <ListItemText primary="Раздел 1" />
            </ListItem>
            <ListItem button >
              <ListItemText primary="Раздел 1" />
            </ListItem>
            <ListItem button >
              <ListItemText primary="Раздел 1" />
            </ListItem>
            <ListItem button >
              <ListItemText primary="Раздел 1" />
            </ListItem>
          </List>*/}
        </Collapse>
      {/*</List>*/}

        {getMenuButtons()}
      </div>
    </Toolbar>
    )
  };

  return (
    <header>
      <AppBar className={header}>
        {displayMenu()}
      </AppBar>
    </header>
  );
}

export default Header;
