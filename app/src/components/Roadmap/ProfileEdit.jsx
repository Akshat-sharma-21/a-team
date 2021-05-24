import React from "react";
import {
  Avatar,
  Fab,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { ReallosButton, Scaffold } from "../utilities/core";
import { PencilIcon, XIcon } from "@primer/octicons-react";
import ProfileImg from "../../assets/martin.jpg";
import "./Roadmap.css";
import { Phone, Mail, Person } from "@material-ui/icons";

function ProfileEdit() {
  return (
    <Scaffold className="profile-edit">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={7}>
          <IconButton
            size="small"
            style={{ margin: "20px 0" }}
            onClick={() => (window.location.href = "/dashboard")}
          >
            <XIcon size={32} className="" />
          </IconButton>
        </Grid>
        <Grid item xs={5}></Grid>

        <Grid item xs={12} style={{ textAlign: "center" }}>
          <div className="profile-img-div">
            <Avatar
              src={ProfileImg}
              alt="profile pic"
              style={{ height: "110px", width: "110px" }}
            />
            <Fab className="profile-fab-btn">
              <PencilIcon size={16} />
            </Fab>
          </div>
        </Grid>

        <Grid item xs={12}>
          <div className="profile-label">First Name</div>
          <TextField
            variant="outlined"
            fullWidth
            type="text"
            lable="First Name"
            placeholder="First Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person className="profile-input" />
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Grid>

        <Grid item xs={12}>
          <div className="profile-label">Last Name</div>
          <TextField
            variant="outlined"
            fullWidth
            type="text"
            lable="Last Name"
            placeholder="Last Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person className="profile-input" />
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <div className="profile-label">Email</div>
          <TextField
            variant="outlined"
            fullWidth
            type="email"
            lable="Email"
            placeholder="abc@xyz.com"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mail className="profile-input" />
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <div className="profile-label">Phone</div>
          <TextField
            variant="outlined"
            fullWidth
            type="text"
            lable="Phone"
            placeholder="+1 4693509711"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone className="profile-input" />
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Grid>
        <Grid xs={12}>
          <ReallosButton
            fullWidth
            primary
            variant="primary"
            className="profile-submit-btn"
          >
            Save
          </ReallosButton>
        </Grid>
      </Grid>
    </Scaffold>
  );
}

export default ProfileEdit;
