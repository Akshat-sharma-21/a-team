import { ThemeOptions } from '@material-ui/core';

/**
 * Material-UI theme settings. To create a theme,
 * pass this object to `createMuiTheme` function
 * 
 * @type {ThemeOptions}
 */
export const muiThemeOptions = {
  palette: {
    primary: {
      main: "#2B56FF",
    },
    secondary: {
      main: "#21DAF1",
    },
    common: {
      white: "#ffffff",
      black: "#000000",
    },
    success: {
      main: "#01AE4B",
    },
    error: {
      main: "#EB0000",
    },
    warning: {
      main: "#F6AC00",
    },
  },
  typography: {
    allVariants: {
      fontFamily: 'Gilroy'
    },
  },
};

/**
 * Navigates to a new location.
 * 
 * @param {string} location
 * Location to navigate
 * 
 * @param {object} historyObject
 * Object containing history info. You can pass
 * either `useHistory()` object or `this.props.history`
 */
export const navigateTo = (location, historyObject) => {
  historyObject.push(location);
}

/**
 * Returns document name with the extension stripped off.
 *
 * @param {string} docName
 * Document name
 */
export const getEffectiveDocumentName = (docName) => {
  docName = String(docName);
  return docName.replace(/\.pdf$/, "");
};
