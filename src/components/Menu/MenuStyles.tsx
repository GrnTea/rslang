import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";


const drawerWidth = 240;
const menuStyles = makeStyles((theme: Theme) =>

  createStyles({

    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    appBarHeader: {
      backgroundColor: 'white',
      // justifyContent: 'center',
    },
    appBarHeaderTitle: {
      display: 'flex',
      justifyContent: 'center',
      color: 'red',
    },
    header: {
      color: 'red',
      fontWeight: 'bold',
    },
    menuButton: {
      marginRight: 36,
      zIndex: '1310',
      position: 'fixed',
      left: '16px',
      backgroundColor: 'white',
    },
    hide: {
      display: 'none',
    },
    closeButton: {
      zIndex: '1210',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerPaper: {
      zIndex: '1210',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

export default menuStyles;