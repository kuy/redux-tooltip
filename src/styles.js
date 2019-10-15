import * as themes from './themes';

const lightTheme = themes.simple;
const darkTheme = themes.dark;

export const base = {
  padding: 0,
  fontSize: 0,
  lineHeight: 0,
  position: 'absolute',
  left: 0,
  top: 0,
  zIndex: 9999,
  width: 'auto',
  overflow: 'visible',
};

export const content = {
  overflow: 'hidden',
};

export const arrow = {
  display: 'block',
  textAlign: 'center',
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: -1,
};

const vertical = {
  left: 0,
  right: 0,
  margin: '0 auto',
};

const horizontal = {
  top: '50%',
  marginTop: '-8px',
};

export const border = (isDarkTheme) => {

    let borderColor = isDarkTheme ? darkTheme.border.borderColor : lightTheme.border.borderColor;
    return {
        base: {
            display: 'block',
            width: 0,
            height: 0,
            position: 'absolute',
            borderStyle: 'solid',
        },
        top: {
            borderColor: borderColor + ' transparent transparent transparent',
            borderWidth: '9px 9px 0px 9px',
            bottom: '-7px',
            ...vertical,
        },
        right: {
            borderColor: 'transparent ' + borderColor + ' transparent transparent',
            borderWidth: '9px 9px 9px 0px',
            left: '-7px',
            ...horizontal,
        },
        bottom: {
            borderColor: 'transparent transparent ' + borderColor + ' transparent',
            borderWidth: '0px 9px 9px 9px',
            top: '-7px',
            ...vertical,
        },
        left: {
            borderColor: 'transparent transparent transparent ' + borderColor,
            borderWidth: '9px 0px 9px 9px',
            right: '-7px',
            ...horizontal,
        },
    };
};
