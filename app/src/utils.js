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
      fontFamily: "Gilroy",
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
};

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

/**
 * Regex to validate email.
 */
// eslint-disable-next-line
export const emailValidationRegex =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

/**
 * Regex to validate phone number.
 */
export const phoneNumberValidationRegex = /^[0-9]{10}$/;

/**
 * Regex to validate name.
 */
export const nameValidationRegex = /^[a-zA-Z ]+$/i;

/**
 * Validates a form field value based on the type
 * of field.
 *
 * @param {string} textValue
 * The value to validate.
 *
 * @param {"firstname" | "lastname" | "email" | "phone" | "role" | "state" | "address" | "password" | "date" | "priority" } fieldType
 * Type of form field that needs to be validated.
 *
 * @returns {{hasError: boolean, errorText: string}}
 * Map containing `hasError` and `errorText`. If the field
 * is valid or `fieldType` is invalid, `errorText` will be `null`.
 */
export const validateFormField = (textValue, fieldType) => {
  let formFieldError = {
    hasError: false,
    errorText: null,
  };

  switch (fieldType) {
    case "name":
      if (textValue.trim() === "") {
        formFieldError = {
          hasError: true,
          errorText: "Name cannot be empty",
        };
      } else if (!textValue.match(nameValidationRegex)) {
        formFieldError = {
          hasError: true,
          errorText: "Name is invalid",
        };
      }

      break;

    case "title":
      if (textValue.trim() === "") {
        formFieldError = {
          hasError: true,
          errorText: "Title cannot be empty",
        };
      }

      break;

    case "firstName":
      if (textValue.trim() === "") {
        formFieldError = {
          hasError: true,
          errorText: "This field cannot be empty",
        };
      }

      break;

    case "lastName":
      if (textValue.trim() === "") {
        formFieldError = {
          hasError: true,
          errorText: "This field cannot be empty",
        };
      }

      break;

    case "email":
      if (textValue === "") {
        formFieldError = {
          hasError: true,
          errorText: "Email cannot be empty",
        };
      } else if (!emailValidationRegex.test(textValue)) {
        formFieldError = {
          hasError: true,
          errorText: "Email is invalid",
        };
      }

      break;

    case "phone":
      if (textValue === "") {
        formFieldError = {
          hasError: true,
          errorText: "Phone number cannot be empty",
        };
      } else if (!phoneNumberValidationRegex.test(textValue)) {
        formFieldError = {
          hasError: true,
          errorText: "Phone number is invalid",
        };
      }

      break;

    case "address":
      if (textValue.trim() === "") {
        formFieldError = {
          hasError: true,
          errorText: "Address cannot be empty",
        };
      }

      break;

    case "description":
      if (textValue.trim() === "") {
        formFieldError = {
          hasError: true,
          errorText: "Description cannot be empty",
        };
      }

      break;

    case "state":
      if (textValue === "") {
        formFieldError = {
          hasError: true,
          errorText: "State cannot be left unselected",
        };
      }

      break;

    case "password":
      if (textValue === "") {
        formFieldError = {
          hasError: true,
          errorText: "Password cannot be empty",
        };
      } else if (textValue.length < 8) {
        formFieldError = {
          hasError: true,
          errorText: "Password must be atleast 8 characters long!",
        };
      }

      break;

    case "date":
      let currentDate = new Date();
      let newDate = new Date(textValue);
      if (textValue === "") {
        formFieldError = {
          hasError: true,
          errorText: "Date cannot be empty",
        };
      } else if (newDate < currentDate) {
        formFieldError = {
          hasError: true,
          errorText: "Date is invalid",
        };
      }

      break;

    case "priority":
      if (textValue === "") {
        formFieldError = {
          hasError: true,
          errorText: "Priority cannot be empty",
        };
      } else if (textValue < 0 || textValue > 2) {
        formFieldError = {
          hasError: true,
          errorText: "Priority must be between 0 to 2",
        };
      }

      break;

    default:
  }

  return formFieldError;
};
