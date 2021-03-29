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
import UserProfile from "./UserProfile/UserProfile";
import GlobalCss from "../../assets/stylesheets/GlobalCSS";
import homeIcon from "../../assets/icons/main.svg";
import dictionaryIcon from "../../assets/icons/big-dictionary.svg";
import gamesIcon from "../../assets/icons/games.svg";
import settingIcon from "../../assets/icons/settings.svg";
import statIcon from "../../assets/icons/trend.svg";
import teamIcon from "../../assets/icons/group.svg";
import exitIcon from "../../assets/icons/logout.svg";



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
    icon: dictionaryIcon,
  },
  {
    label: "Мини-игры",
    href: "/games",
    icon: gamesIcon,

  },
  {
    label: "Настройки",
    href: "/settings",
    icon: settingIcon,

  },
  {
    label: "Статистика",
    href: "/statistics",
    icon: statIcon,

  },
  {
    label: "Команда",
    href: "/team",
    icon: teamIcon,

  },
  {
    label: "Exit",
    href: "/Exit",
    icon: exitIcon,

  },
];


function Header() {

  const { appBar, toolbar, logo, list, listLinkItemSection, listLinkItemLearn, listItemContainer, collapsedList, listLinkItem, drawerContainer } = headerStyles();
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const displayMenu = () => {

    const handleDrawerOpen = () =>
      setDrawerOpen(true);

    const handleDrawerClose = () =>
      setDrawerOpen(false);

    const getListItems = () => {
      function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
        return <ListItem button component="a" {...props} />;
      }

      return [1,2,3,4,5,6].map((listItem) => {
        return (
          <ListItemLink key={`k${listItem}`} href={`#textbook/section/${listItem}`}>
            <ListItemText className={listLinkItemSection}  primary={`Раздел ${listItem}`}/>
          </ListItemLink>
        );
      });
    };

    const getDrawerChoices = () => {
      return buttonsData.map(({ label, href, icon }) => {
        return (
          <Link
            className={listLinkItem}
            to={href}
            key={label}
          >
            <div className={listItemContainer}>
              <img src={`${icon}`} alt={`${icon}`}/>
              <MenuItem className={listLinkItem}>{label}</MenuItem>
            </div>
          </Link>
        );
      });
    };

    return (
      <div >
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
          <MenuIcon
            fontSize="large"/>
        </IconButton>
        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div>
            <IconButton color="primary"
              {...{
                onClick: handleDrawerClose,
              }}
            >
              <CloseIcon
                fontSize="large"/>
            </IconButton>
          </div>

          <List className={list}>
            <Link to="/" className={listLinkItem}>
              <MenuItem>{"Главная"}</MenuItem>
            </Link>

            <ListItem className={collapsedList} button onClick={handleClick}>
              <ListItemText className={listLinkItemLearn} primary="Изучение" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {getListItems()}
              </List>
            </Collapse>
          </List>

          <div className={drawerContainer}>
            {getDrawerChoices()}
          </div>
        </Drawer>

        <Typography variant="h5" component="h1" className={logo}>
          RS Lang
        </Typography>

        <UserProfile />

      </Toolbar>
      </div>
    );
  };

  return (
    <>
      <GlobalCss />
      <AppBar className={appBar}>
        {displayMenu()}
      </AppBar>
    </>
  );
}

export default Header;
