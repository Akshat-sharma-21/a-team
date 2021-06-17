import { myFirebase, myFirestore } from "./FirebaseConfig";

/**
 * List of maps containing user roles in the form:
 *
 * ```
 * {value: '...', label: '...'}
 * ```
 */
export const USER_ROLES = [
  { value: "buyer", label: "Buyer" },
  { value: "seller", label: "Seller" },
  { value: "lender", label: "Lender" },
  { value: "buyer-agent", label: "Buyer Agent" },
  { value: "seller-agent", label: "Seller Agent" },
  { value: "title-agent", label: "Title Agent" },
  { value: "escrow-agent", label: "Escrow Agent" },
  { value: "home-inspector", label: "Home Inspector" },
];

/**
 * Returns role label of a user based on `roleValue`
 *
 * @param {"buyer" | "seller" | "buyer-agent" | "seller-agent" | "title-agent" | "escrow-agent" | "home-inspector"} roleValue
 * Role Value
 *
 * @returns {string}
 * Role label
 */
export const getRoleLabel = (roleValue) => {
  let roleLabel = null;

  USER_ROLES.map((role) => {
    if (role.value === roleValue) {
      roleLabel = role.label;
    }
    return null;
  });

  return roleLabel;
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
 * Validates a form field value based on the type
 * of field.
 *
 * @param {string} textValue
 * The value to validate.
 *
 * @param {"firstname" | "lastname" | "email" | "phone" | "role" | "state" | "address" | "password" | "date" | "priority"| "title" | "description"} fieldType
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

    case "role":
      if (textValue === "") {
        formFieldError = {
          hasError: true,
          errorText: "Role cannot be left unselected",
        };
      } else if (getRoleLabel(textValue) === "null") {
        formFieldError = {
          hasError: true,
          errorText: "Role is invalid",
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

/**
 * Converts bytes to other measurments of size.
 * _('KB', 'MB', 'GB', 'TB')_
 *
 * @param {number} bytes
 * Size in bytes
 *
 * @returns {string}
 * Converted size measurment
 */
export const bytesToSize = (bytes) => {
  // @SRC: https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript

  let sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  if (bytes === 0) return "0 Byte";

  let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`;
};

/**
 * Returns hash present in the URL of current page
 * with decoded URI encodings.
 *
 * @param {object} locationObject
 * Object containing location data. You must pass either
 * `this.props.location` or a `useLocation` object.
 */
export const getDecodedHash = (locationObject) => {
  const hash = locationObject.hash;
  const decodedHash = decodeURIComponent(hash);

  return decodedHash;
};

/**
 * Returns `TransactionID` from **location** prop.
 * Will return `null` if the location does not have a TransactionID.
 *
 * @param {object} locationObject
 * Object containing location data. You must pass either
 * `this.props.location` or a `useLocation` object.
 *
 * @returns {string}
 * TransactionID as a string.
 */
export const getTransactionID = (locationObject) => {
  let transactionID = locationObject.pathname.includes("transactions")
    ? locationObject.pathname.split("/")[2]
    : null;

  return transactionID;
};

/**
 * Returns the list of people involved in a transaction.
 *
 * @param {string} transactionID
 * Transaction ID for which the people list has
 * to be fetched.
 *
 * @returns {Promise<object[]>}
 */
export const getPeopleInvolved = async (transactionID) => {
  // @TODO: Add error handling

  /*
    Return dummy. (Uses Firebase)
    @TODO: Logic to be replaced
  */

  const transactionDataDocSnapshot = await myFirestore
    .collection("Transactions")
    .doc(transactionID)
    .get();

  const peopleIdList = transactionDataDocSnapshot.data().People;

  if (peopleIdList) {
    const peopleInvolved = await Promise.all(
      peopleIdList.map(async (personId) => {
        const personDataDocSnapshot = await myFirestore
          .collection("Portal_Users")
          .doc(personId)
          .get();

        return personDataDocSnapshot.data();
      })
    );

    return peopleInvolved;
  }

  return [];
};

/**
 * Returns the username of a user using their email.
 *
 * @param {string} email
 * Email of the user. If this parameter is left out or is not valid,
 * `null` is returned by the function.
 *
 * @param {object[]?} peopleInvolvedObject
 * List of People Involved in a transaction.
 *
 * @returns {string?}
 * Name of the user corresponding to the email.
 */
export const getUserName = (email, peopleInvolvedObject) => {
  if (validateFormField(email, "email").hasError) return;

  const filtered = peopleInvolvedObject.filter(
    (person) => person.Email === email
  );

  if (filtered.length !== 0) {
    return `${filtered[0].FirstName} ${filtered[0].LastName}`;
  }

  return "";
};

/**
 * Returns `currentUser` from `firebase.auth` namespace.
 *
 * @returns {firebase.User}
 * Object containing details of the user currently
 * signed in. If no user is signed in, `null` is returned.
 */
export const getCurrentUser = () => {
  /*
    Return dummy. Uses Firebase
    @TODO: Logic to be replaced
  */

  return myFirebase.auth().currentUser;
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
