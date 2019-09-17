const drawerWidth = 240;

const getStyles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.custom.appBar.backgroundColor,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 24,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 48px)',
      marginTop: 48,
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    backgroundColor: theme.custom.drawerHeader.backgroundColor,
    color: theme.custom.drawerHeader.color,
    marginBottom: 10,
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth,
  },
  drawerPaper: {
    width: 240,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      overflowY: 'auto',
      overflowX: 'hidden',
    },
    backgroundColor: theme.custom.drawerPaper.backgroundColor,
  },
  drawerPaperClose: {
    width: 60,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  expandCollapseIcon: {
    width: 20,
    height: 20,
  },
  link: {
    textDecoration: 'none',
    background: 'none',
    border: 'none',
    width: '100%',
    padding: 0,
    cursor: 'pointer',
    color: theme.custom.link.color,
    wordBreak: 'break-all',
  },
  listItemText: {
    fontSize: 14,
    color: theme.custom.listItemText.color,
  },
  loadingText: {
    color: theme.palette.text.secondary,
  },
  menuButton: {
    marginLeft: 0,
    marginRight: 0,
  },
  menuItemCloseIcon: {
    visibility: 'hidden',
    outlineColor: 'transparent',
    position: 'absolute',
    top: 12,
    right: 5,
    zIndex: 1,
  },
  menuTitle: {
    fontSize: 14,
  },
  MenuItemText: {
    fontSize: '0.8rem',
    paddingLeft: '43px !important',
  },
  menuTitleContainer: {
    position: 'sticky',
    zIndex: 1,
    top: 0,
    backgroundColor: theme.custom.drawerMenuList.backgroundColor,
    paddingRight: 16,
  },
  noPadding: {
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
  },
  openViews: {
    maxHeight: 230,
  },
  root: {
    width: '100%',
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
  },
  settingsCloseButton: {
    position: 'absolute',
    top: 70,
    left: 0,
  },
  settingsContainer: {
    padding: '120px 20px 0px',
  },
  settingsDrawer: {
    backgroundColor: 'whitesmoke',
    width: 300,
    position: 'fixed',
  },
  selectedItemText: {
    color: theme.custom.selectedItemText.color,
    fontWeight: 500,
  },
  selectedMenuItem: {
    backgroundColor: `${theme.custom.selectedItem.backgroundColor} !important`,
  },
  selectedItemIcon: {
    color: theme.custom.selectedItemIcon.color,
  },
  sidebarTitle: {
    color: theme.custom.title.color,
    fontWeight: 100,
    width: '100%',
    textAlign: 'center',
  },
  selectedSubMenuIcon:{
    minWidth: 0,
    paddingLeft: '6px',
    marginRight: '-17px',
    transform: 'scaleY(0.99)',
  },
  selectedMenuItemIcon: {
    fontSize: '0.8em',
  },
  sidebarTitleBold: {
    fontWeight: 700,
    marginLeft: -5,
  },
  MenuItemIcon:{
    minWidth: 41,
  },
  subHeader: {
    paddingLeft: 10,
  },
  tab: {
    height: 48,
    textAlign: 'center',
  },
  tabCloseIcon: {
    visibility: 'hidden',
    outlineColor: 'transparent',
    position: 'absolute',
    top: 0,
    right: 1,
    cursor: 'default',
    zIndex: 1,
  },
  tabs: {
    width: '100%',
  },
  tabIndicator: {
    backgroundColor: theme.custom.tabSelected.color,
  },
  tabRoot: {
    color: theme.custom.tab.color,
    fontWeight: 400,
    fontSize: '0.9rem',
    '&$tabSelected': {
      color: theme.custom.tabSelected.color,
      fontWeight: 400,
    },
    opacity: '1 !important',
  },
  tabSelected: {},
  fab: {
    backgroundColor: theme.custom.secondary.color,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.custom.secondary.dark.color,
    },
  },
  fabAction: {
    width: 32,
    height: 32,
    minHeight: 0,
    margin: '0 2px',
    boxShadow:
      '0px 1px 3px -1px rgba(0,0,0,0.2), 0px 3px 5px 0px rgba(0,0,0,0.14), 0px 1px 9px 0px rgba(0,0,0,0.12)',
  },
  iconAction: {
    width: '0.8em',
    height: '0.8em',
    fontSize: '22px',
  },
});

export default getStyles;
