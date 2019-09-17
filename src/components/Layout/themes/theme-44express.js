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
      primary: '#282829',
      secondary: '#ce4899',
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
      color: '#e10050',
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
      color: '#282829',
    },
    selectedItemIcon: {
      color: '#ce4899',
    },
    listItemText: {
      color: 'rgba(0,0,0,0.6)',
    },
    text: '#757575',
    title: {
      color: '#ce4899',
    },
    tab: {
      color: 'rgba(0,0,0,0.38)',
    },
    tabSelected: {
      color: '#ce4899',
    },
    secondary: {
      color: '#ce4899',
      dark: {
        color: '#b53f86',
      },
    },
  },
});

export default theme44express;
