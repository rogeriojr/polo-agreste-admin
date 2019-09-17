import ThemeDefault from './theme-default';
import ThemeAtom from './theme-atom';
import ThemeAurelia from './theme-aurelia';
import ThemeQuiet from './theme-quiet';
import ThemeSky from './theme-sky';
import Theme44Express from './theme-44express';

const getCurrentTheme = currentTheme => {
  let muiTheme;
  switch (currentTheme) {
    case 'atom':
      muiTheme = ThemeAtom;
      break;
    case 'aurelia':
      muiTheme = ThemeAurelia;
      break;
    case 'quiet':
      muiTheme = ThemeQuiet;
      break;
    case 'sky':
      muiTheme = ThemeSky;
      break;
    case 'default':
      muiTheme = ThemeDefault;
      break;
    default:
      muiTheme = Theme44Express;
      break;
  }

  // Custom default shadow
  muiTheme.shadows[2] =
    '0px 0px 1px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12)';

  return muiTheme;
};

export default getCurrentTheme;
