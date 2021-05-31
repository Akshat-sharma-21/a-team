import React, { useState } from "react";
import {
  Avatar,
  Fab,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { ReallosButton, Scaffold } from "../utilities/core";
import {
  uploadPicture,
  setUserAction,
  updateUser,
} from "../../actions/userActions";
import { PencilIcon, XIcon } from "@primer/octicons-react";
import "./Roadmap.css";
import { Phone, Mail, Person } from "@material-ui/icons";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const mapActionToProps = (dispatch) => {
  return bindActionCreators({ setUserAction }, dispatch);
};

function ProfileEdit(props) {
  const { user, closeDrawer } = props; // Getting the user
  let [uploadingPicture, setUploadingPicture] = useState(false);
  let [updatingProfile, setUpdatingProfile] = useState(false);
  let [profilePicture, setProfilePicture] = useState(user.PhotoUrl); // Initializing profilePicture with the url
  let [FirstName, setFirstName] = useState(null);
  let [LastName, setLastName] = useState(null);
  let [Email, setEmail] = useState(null);
  let [PhoneNumber, setPhoneNumber] = useState(null);
  let [changesMade, setChangesMade] = useState(false);

  function getSelectedFile(e) {
    setUploadingPicture(true); // Setting the uploading picture to be true
    setProfilePicture(null); // Setting the photo to be null as the picture is being loaded
    let file = e.target.files[0]; // Getting the selected file

    uploadPicture(file)
      .then((url) => {
        let updateUser = { ...user, PhotoUrl: url };
        props.setUserAction(updateUser); // dispatching an action to update the state of the user
        setProfilePicture(url); // Setting the avatar with the new photo
        setUploadingPicture(false); // Once the picture is uploaded and is saved
      })
      .catch((err) => {
        console.error(err); // logging the error
        setProfilePicture(null);
        setUploadingPicture(false);
      });
  }

  function updateUserData(userData) {
    setUpdatingProfile(true);
    let updatedData = { ...user, emailChanged: false, phoneChanged: false };
    let FirstName = user.Name.split(" ")[0];
    let LastName = user.Name.split(" ")[1];

    if (FirstName !== userData.FirstName && userData.FirstName) {
      FirstName = userData.FirstName;
    }

    if (LastName !== userData.LastName && userData.LastName) {
      LastName = userData.LastName;
    }

    updatedData.Name = FirstName + " " + LastName;

    if (user.Email !== userData.Email && userData.Email) {
      updatedData.Email = userData.Email;
      updatedData.emailChanged = true;
    }
    if (user.Phone !== userData.Phone && userData.Phone) {
      updatedData.Phone = userData.Phone;
      updatedData.phoneChanged = true;
    }
    updateUser(updatedData)
      .then(() => {
        props.setUserAction({
          Name: updatedData.Name,
          Email: updatedData.Email,
          Phone: updatedData.Phone,
          Transaction: updatedData.Transaction,
          PhotoUrl: updatedData.PhotoUrl,
          emailVerified: updatedData.emailVerified,
          phoneVerified: updatedData.phoneVerified,
        });
        resetForm();
        setUpdatingProfile(false);
      })
      .catch((err) => {
        console.error(err); // logging the error
        setUpdatingProfile(false);
      });
  }

  function resetForm() {
    // function to reset the form
    setFirstName(null);
    setLastName(null);
    setPhoneNumber(null);
    setEmail(null);
    setChangesMade(false);
    closeDrawer(); // closing the drawer once the data has been updated
  }

  function displayForm() {
    // To display the function
    return (
      <>
        {" "}
        <Grid item xs={12} style={{ marginTop: 10 }}>
          <div className="profile-label">First Name</div>
          <TextField
            variant="outlined"
            fullWidth
            type="text"
            lable="First Name"
            placeholder={user.Name.split(" ")[0]}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person className="profile-input" />
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              setFirstName(e.target.value);
              setChangesMade(true);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <div className="profile-label">Last Name</div>
          <TextField
            variant="outlined"
            fullWidth
            type="text"
            lable="Last Name"
            placeholder={user.Name.split(" ")[1]}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person className="profile-input" />
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              setLastName(e.target.value);
              setChangesMade(true);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <div className="profile-label">Email</div>
          <TextField
            variant="outlined"
            fullWidth
            type="email"
            lable="Email"
            placeholder={user.Email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mail className="profile-input" />
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              setEmail(e.target.value);
              setChangesMade(true);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <div className="profile-label">Phone</div>
          <TextField
            variant="outlined"
            fullWidth
            type="text"
            lable="Phone"
            placeholder={user.Phone}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone className="profile-input" />
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              setChangesMade(true);
            }}
          />
        </Grid>
        <Grid xs={12}>
          <ReallosButton
            fullWidth
            primary
            variant="primary"
            className="profile-submit-btn"
            disabled={
              !changesMade ||
              (!FirstName && !LastName && !Email && !PhoneNumber) ||
              updatingProfile
            }
            onClick={() => {
              updateUserData({
                FirstName: FirstName,
                LastName: LastName,
                Email: Email,
                Phone: PhoneNumber,
              });
            }}
          >
            Save
          </ReallosButton>
        </Grid>
      </>
    );
  }
  return (
    <Scaffold className="profile-edit">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={7}>
          <IconButton
            size="small"
            style={{ margin: "20px 0" }}
            disabled={uploadingPicture || updatingProfile}
            onClick={() => closeDrawer()}
          >
            <XIcon size={32} className="" />
          </IconButton>
        </Grid>
        <Grid item xs={5}></Grid>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <div className="profile-img-div">
            {profilePicture === null ? ( // To display the appropriate Avatar Icon
              <Avatar className="profile-edit-avatar">{user.Name[0]}</Avatar>
            ) : (
              <Avatar className="profile-edit-avatar" src={profilePicture} />
            )}
            <input
              id="fileInput"
              type="file"
              hidden
              accept={"image/png, image/jpeg"} // Allowing only image types
              multiple={false}
              onChange={getSelectedFile}
            />
            <Fab
              className="profile-fab-btn"
              disabled={uploadingPicture || updatingProfile}
              onClick={
                () => document.getElementById("fileInput").click() // To simulate a click and open the file selector
              }
            >
              <PencilIcon size={16} />
            </Fab>
          </div>
        </Grid>
        {uploadingPicture !== true ? (
          displayForm()
        ) : (
          // If the picture is uploading
          <div className="roadmap-single-view-container">
            <CircularProgress />
          </div>
        )}
      </Grid>
    </Scaffold>
  );
}

export default connect(null, mapActionToProps)(ProfileEdit);
