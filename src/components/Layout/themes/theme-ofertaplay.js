import { createMuiTheme } from '@material-ui/core/styles';

const themeOfertaPlay = createMuiTheme({
  palette: {
    primary: {
      500: '#716aca',
    },
    action: {
      active: '#525672',
    },
    text: {
      primary: '#282829',
      secondary: '#F48A2A',
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
      color: '#F48A2A',
    },
    listItemText: {
      color: 'rgba(0,0,0,0.6)',
    },
    text: '#757575',
    title: {
      color: '#F48A2A',
    },
    tab: {
      color: 'rgba(0,0,0,0.38)',
    },
    tabSelected: {
      color: '#F48A2A',
    },
    secondary: {
      color: '#F48A2A',
      dark: {
        color: '#de812d',
      },
    },
  },
});

export default themeOfertaPlay;
