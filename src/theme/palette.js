import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const GREY = {
  0: '#F7F7F7FFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
};

// const PRIMARY = {
//   lighter: '#9F9F9F', #6B9CD4
//   light: '#3F3F3F', #405E80 #ABD2FF
//   main: '#0F0F0F', #16477F
//   dark: '#080808', #281680 #1B2C40
//   darker: '#0B0B0B', #162680 #1D3755
//   contrastText: '#F7F7F7',
// };
// const SECONDARY = {
//   lighter: '#FFE9D0', #FFF0D5
//   light: '#FFA843', #168074 #D4AE6B
//   main: '#F18914', #166880
//   dark: '#BF6E0F', #805916
//   darker: '#402505', #805916
//   contrastText: '#F7F7F7',
// };
const PRIMARY = {
  lighter: '#ABD2FF',
  light: '#6B9CD4',
  main: '#16477F',
  dark: '#281680',
  darker: '#1D3755',
  contrastText: '#F7F7F7',
};
const SECONDARY = {
  lighter: '#FFF0D5',
  light: '#D4AE6B',
  main: '#F18914',
  dark: '#805916',
  darker: '#402505',
  contrastText: '#F7F7F7',
};
const INFO = {
  lighter: '#99C8DB',
  light: '#3391B8',
  main: '#0075A6',
  dark: '#00587D',
  darker: '#001D29',
  contrastText: '#F7F7F7',
};
const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D620',
  dark: '#229A16',
  darker: '#08660D',
  contrastText: GREY[800],
};
const WARNING = {
  lighter: '#F4E5CC',
  light: '#D39533',
  main: '#C87B00',
  dark: '#965C00',
  darker: '#321F00',
  contrastText: GREY[800],
};
const ERROR = {
  lighter: '#FFE9D0',
  light: '#9C4446',
  main: '#831518',
  dark: '#621012',
  darker: '#210506',
  contrastText: '#F7F7F7',
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

const palette = {
  common: { black: '#000', white: '#F7F7F7' },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  grey: GREY,
  gradients: GRADIENTS,
  divider: GREY[500_24],
  text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
  background: { paper: '#F7F7F7', default: '#F7F7F7', neutral: GREY[200] },
  action: {
    active: GREY[600],
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default palette;
