import { createMuiTheme } from '@material-ui/core/styles';

const theme44express = createMuiTheme({
  palette: {
    primary: {
      500: '#716aca',
    },
    action: {
      active: '#525672',
    },
    text: {
      primary: '#000000',
      secondary: '#003B40',
      divider: '#292b3a',
    },
  },
  typography: {
    useNextVariants: true,
    subtitle1: {
      fontSize: 14,
    },
  },
  custom: {
    link: {
      color: 'e0e0e0',
    },
    appBar: {
      backgroundColor: '#F2F6F9',
    },
    drawerPaper: {
      backgroundColor: '#fff',
    },
    drawerHeader: {
      backgroundColor: '#fff',
      color: '#fff',
    },
    drawerMenuList: {
      backgroundColor: '#fff',
    },
    selectedItem: {
      backgroundColor: 'transparent',
    },
    selectedItemText: {
      color: '#000000',
    },
    selectedItemIcon: {
      color: '#003B40',
    },
    listItemText: {
      color: 'rgba(0,0,0,0.6)',
    },
    text: '#757575',
    title: {
      color: '#003B40',
    },
    tab: {
      color: 'rgba(0,0,0,0.38)',
    },
    tabSelected: {
      color: '#003B40',
    },
    secondary: {
      color: '#003B40',
      dark: {
        color: '#003B40',
      },
    },
  },
});

export default theme44express;
