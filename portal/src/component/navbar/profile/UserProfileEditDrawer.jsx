import React from "react";
import PropTypes from "prop-types";
import { PencilIcon } from "@primer/octicons-react";
import ImgUploadModal from "../photo_uploader/ImgUploadModal";
import "./UserProfileEditDrawer.css";
// import PhotoUploadModal from "../photo_uploader/PhotoUploader";

import {
  ReallosModal,
  ModalActionFooter,
  ReallosButton,
  SideDrawer,
} from "../../utilities/core";

import { USER_ROLES, validateFormField } from "../../../utils";

import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Grid,
  Avatar,
  Badge,
  Fab,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormGroup,
  FormHelperText,
} from "@material-ui/core";

import { editUser, updatePhotoAction } from "../../../actions/userActions";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ editUser, updatePhotoAction }, dispatch);
};

/**
 * Display a "User Profile Edit" Side Drawer
 * @augments {React.Component<Props>}
 */
class UserProfileEditDrawer extends React.Component {
  static propTypes = {
    /**
     * Set visibility of "Profile Edit" Side Drawer
     */
    visible: PropTypes.bool,

    /**
     * Callback function to dismiss the Side Drawer
     * when clicked outside the drawer
     */
    dismissCallback: PropTypes.func,

    /**
     * Objct containing user details like
     * username and email
     */
    user: PropTypes.shape({
      id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      role: PropTypes.string,
      phone: PropTypes.string,
      profilePhoto: PropTypes.string,
    }),
  };

  constructor(props) {
    super(props);

    this.userDataUpdateModalTextValues = {
      firstName: "",
      lastName: "",
      role: "",
      email: "",
      phone: "",
    };

    this.state = {
      // User Profile Data: local changes
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      role: props.user.role,
      email: props.user.email,
      phone: props.user.phone,
      profilePhoto: props.user.profilePhoto,
      modalOpen: false,

      // Is the update user data modal visible
      isUpdateModalVisible: false,

      // Type of data which is being updated currently
      updateModalType: "",

      // Holds error values associated with update modal fields
      updateModalFieldErrors: {
        firstName: validateFormField("", "dummy"),
        lastName: validateFormField("", "dummy"),
        role: validateFormField("", "dummy"),
        email: validateFormField("", "dummy"),
        phone: validateFormField("", "dummy"),
      },
    };

    this.showUploadModalVisibility = this.showUploadModalVisibility.bind(this);
    this.dismissUploadModal = this.dismissUploadModal.bind(this);
  }

  /**
   * Saves the changes to the database
   */
  submitEdits() {
    let newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
    };

    this.props.editUser(newUser);

    // @TODO: Apply save logic

    this.props.dismissCallback();
  }

  /**
   * Discards the changes made to user profile
   */
  cancelEdits() {
    this.setState({
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      phone: this.props.user.phone,
      role: this.props.user.role,
    });

    this.props.dismissCallback();
  }

  /**
   * Display user data editing modal
   * @param {"USER_NAME" | "USER_EMAIL" | "USER_ROLE" | "USER_PHONE"} mode
   */
  updateUserData(mode) {
    this.setState({
      isUpdateModalVisible: true,
      updateModalType: mode,
    });
  }

  /**
   * Dismiss the update modal
   * @param {object} stateData
   */
  dismissUpdateModal(stateData) {
    setTimeout(() => {
      this.userDataUpdateModalTextValues = {
        firstName: "",
        lastName: "",
        role: "",
        email: "",
        phone: "",
      };

      this.setState({
        updateModalType: "NONE_TYPE",
      });
    }, 300);

    this.setState({
      isUpdateModalVisible: false,
      ...stateData,
    });
  }

  /**
   * Sets the upload modal visibility to `true`
   */
  showUploadModalVisibility() {
    this.setState({
      isUploadModalVisible: true,
    });
  }

  /**
   * Sets the upload modal visibility to `true`
   */
  dismissUploadModal() {
    this.setState({
      isUploadModalVisible: false,
    });
  }

  /**
   * Renders the update user data modal based on `mode`
   * @param {"USER_NAME" | "USER_EMAIL" | "USER_ROLE" | "USER_PHONE"} mode
   */
  renderUpdateUserDataModal(mode) {
    let modalTitle;
    let ModalContent;
    let _saveChanges;
    let _handleChange;

    const { user } = this.props;

    switch (mode) {
      case "USER_NAME":
        let _errors = {
          firstName: validateFormField("", "dummy"),
          lastName: validateFormField("", "dummy"),
        };

        _saveChanges = () => {
          let validationFirstName = validateFormField(
            this.userDataUpdateModalTextValues.firstName,
            "name"
          );

          let validationLastName = validateFormField(
            this.userDataUpdateModalTextValues.lastName,
            "name"
          );

          _errors = {
            firstName: validationFirstName,
            lastName: validationLastName,
          };

          if (!validationFirstName.hasError && !validationLastName.hasError) {
            this.dismissUpdateModal({
              firstName: this.userDataUpdateModalTextValues.firstName.trim(),
              lastName: this.userDataUpdateModalTextValues.lastName.trim(),
            });
          }

          this.setState({
            updateModalFieldErrors: {
              ...this.state.updateModalFieldErrors,
              ..._errors,
            },
          });
        };

        _handleChange = (e, fieldName) => {
          let fieldValidation = validateFormField(e.target.value, "name");

          if (fieldName === "firstName") {
            this.userDataUpdateModalTextValues.firstName = e.target.value;

            _errors = {
              firstName: fieldValidation,
              lastName: _errors.lastName,
            };
          } else {
            this.userDataUpdateModalTextValues.lastName = e.target.value;

            _errors = {
              firstName: _errors.firstName,
              lastName: fieldValidation,
            };
          }

          this.setState({
            updateModalFieldErrors: {
              ...this.state.updateModalFieldErrors,
              ..._errors,
            },
          });
        };

        modalTitle = "Update Name";
        ModalContent = (
          <div>
            <p style={{ marginBottom: 30 }}>
              Your current name is "
              <strong>{`${user.firstName} ${user.lastName}`}</strong>
              ". Enter a new name to change your current name.
            </p>

            <FormGroup>
              <TextField
                variant="outlined"
                label="New First Name"
                style={{ width: "100%" }}
                error={this.state.updateModalFieldErrors.firstName.hasError}
                helperText={
                  this.state.updateModalFieldErrors.firstName.errorText
                }
                onChange={(e) => _handleChange(e, "firstName")}
                onKeyPress={(e) => {
                  if (e.key === "Enter") _saveChanges();
                }}
              />

              <TextField
                variant="outlined"
                label="New Last Name"
                style={{ width: "100%", marginTop: 10 }}
                error={this.state.updateModalFieldErrors.lastName.hasError}
                helperText={
                  this.state.updateModalFieldErrors.lastName.errorText
                }
                onChange={(e) => _handleChange(e, "lastName")}
                onKeyPress={(e) => {
                  if (e.key === "Enter") _saveChanges();
                }}
              />
            </FormGroup>

            <ModalActionFooter>
              <ReallosButton onClick={() => this.dismissUpdateModal()}>
                Cancel
              </ReallosButton>
              <ReallosButton primary onClick={() => _saveChanges()}>
                Done
              </ReallosButton>
            </ModalActionFooter>
          </div>
        );

        break;

      case "USER_ROLE":
        _saveChanges = () => {
          let fieldValidation = validateFormField(
            this.userDataUpdateModalTextValues.role,
            "role"
          );

          if (!fieldValidation.hasError) {
            this.dismissUpdateModal({
              role: this.userDataUpdateModalTextValues.role,
            });
          }

          this.setState({
            updateModalFieldErrors: {
              ...this.state.updateModalFieldErrors,
              role: fieldValidation,
            },
          });
        };

        _handleChange = (e) => {
          let fieldValidation = validateFormField(e.target.value, "role");

          this.userDataUpdateModalTextValues.role = e.target.value;

          this.setState({
            updateModalFieldErrors: {
              ...this.state.updateModalFieldErrors,
              role: fieldValidation,
            },
          });
        };

        modalTitle = "Update Role";
        ModalContent = (
          <div>
            <p style={{ marginBottom: 30 }}>
              Your current role is "<strong>{this.state.role}</strong>". Select
              a new role to change your current role.
            </p>

            <FormControl variant="outlined" style={{ width: "100%" }}>
              <InputLabel id="new-role">New Role</InputLabel>

              <Select
                labelId="new-role"
                label="New Role"
                variant="outlined"
                error={this.state.updateModalFieldErrors.role.hasError}
                onChange={(e) => _handleChange(e)}
              >
                {USER_ROLES.map((role) => {
                  return <MenuItem value={role.value}>{role.label}</MenuItem>;
                })}
              </Select>

              <FormHelperText error>
                {this.state.updateModalFieldErrors.role.errorText}
              </FormHelperText>
            </FormControl>

            <ModalActionFooter>
              <ReallosButton onClick={() => this.dismissUpdateModal()}>
                Cancel
              </ReallosButton>
              <ReallosButton primary onClick={() => _saveChanges()}>
                Done
              </ReallosButton>
            </ModalActionFooter>
          </div>
        );

        break;

      case "USER_EMAIL":
        _saveChanges = () => {
          let fieldValidation = validateFormField(
            this.userDataUpdateModalTextValues.email,
            "email"
          );

          if (!fieldValidation.hasError) {
            this.dismissUpdateModal({
              email: this.userDataUpdateModalTextValues.email,
            });
          }

          this.setState({
            updateModalFieldErrors: {
              ...this.state.updateModalFieldErrors,
              email: fieldValidation,
            },
          });
        };

        _handleChange = (e) => {
          let fieldValidation = validateFormField(e.target.value, "email");

          this.userDataUpdateModalTextValues.email = e.target.value;

          this.setState({
            updateModalFieldErrors: {
              ...this.state.updateModalFieldErrors,
              email: fieldValidation,
            },
          });
        };

        modalTitle = "Update Email";
        ModalContent = (
          <div>
            <p style={{ marginBottom: 30 }}>
              Your current email is "<strong>{this.state.email}</strong>". Enter
              a new email to change your current email.
            </p>

            <TextField
              variant="outlined"
              label="New Email"
              style={{ width: "100%" }}
              error={this.state.updateModalFieldErrors.email.hasError}
              helperText={this.state.updateModalFieldErrors.email.errorText}
              onChange={(e) => _handleChange(e)}
              onKeyPress={(e) => {
                if (e.key === "Enter") _saveChanges();
              }}
            />

            <ModalActionFooter>
              <ReallosButton onClick={() => this.dismissUpdateModal()}>
                Cancel
              </ReallosButton>
              <ReallosButton primary onClick={() => _saveChanges()}>
                Done
              </ReallosButton>
            </ModalActionFooter>
          </div>
        );

        break;

      case "USER_PHONE":
        _saveChanges = () => {
          let fieldValidation = validateFormField(
            this.userDataUpdateModalTextValues.phone,
            "phone"
          );

          if (!fieldValidation.hasError) {
            this.dismissUpdateModal({
              phone: this.userDataUpdateModalTextValues.phone,
            });
          }

          this.setState({
            updateModalFieldErrors: {
              ...this.state.updateModalFieldErrors,
              phone: fieldValidation,
            },
          });
        };

        _handleChange = (e) => {
          let fieldValidation = validateFormField(e.target.value, "phone");

          this.userDataUpdateModalTextValues.phone = e.target.value;

          this.setState({
            updateModalFieldErrors: {
              ...this.state.updateModalFieldErrors,
              phone: fieldValidation,
            },
          });
        };

        modalTitle = "Update Phone Number";
        ModalContent = (
          <div>
            <p style={{ marginBottom: 30 }}>
              Your current phone number is "<strong>{this.state.phone}</strong>
              ". Enter a new phone number to change the current one.
            </p>

            <TextField
              variant="outlined"
              label="New Phone Number"
              style={{ width: "100%" }}
              error={this.state.updateModalFieldErrors.phone.hasError}
              helperText={this.state.updateModalFieldErrors.phone.errorText}
              onChange={(e) => _handleChange(e)}
              onKeyPress={(e) => {
                if (e.key === "Enter") _saveChanges();
              }}
            />

            <ModalActionFooter>
              <ReallosButton onClick={() => this.dismissUpdateModal()}>
                Cancel
              </ReallosButton>
              <ReallosButton primary onClick={() => _saveChanges()}>
                Done
              </ReallosButton>
            </ModalActionFooter>
          </div>
        );

        break;

      default:
        modalTitle = "No Title";
        ModalContent = <></>;
        break;
    }

    return (
      <ReallosModal
        visible={this.state.isUpdateModalVisible}
        title={modalTitle}
        disableBackdropBlur={true}
        dismissCallback={() => this.dismissUpdateModal()}
        modalWidth={520}
      >
        {ModalContent}
      </ReallosModal>
    );
  }

  render() {
    let { visible, dismissCallback, utils } = this.props;
    const userDataList = [
      {
        id: "USER_NAME",
        label: "Name",
        value: `${this.state.firstName} ${this.state.lastName}`,
        isEditable: true,
      },
      {
        id: "USER_ROLE",
        label: "Role",
        value: this.state.role,
        isEditable: false,
      },
      {
        id: "USER_EMAIL",
        label: "Email",
        value: this.state.email,
        isEditable: true,
      },
      {
        id: "USER_PHONE",
        label: "Phone Number",
        value: `${this.state.phone}`,
        isEditable: true,
      },
    ];
    return (
      <div className="user-profile-edit-drawer">
        <SideDrawer
          title="Edit Profile"
          visible={visible}
          dismissCallback={dismissCallback}
          side="right"
          className="user-profile-edit-drawer-main"
        >
          <Grid container className="user-profile-edit-avatar" justify="center">
            <Badge
              overlap="circle"
              badgeContent={
                <Fab
                  aria-label="Edit Profile Picture"
                  size="small"
                  style={{ background: "#ffffff" }}
                  onClick={() => this.setState({ modalOpen: true })}
                >
                  <PencilIcon />
                </Fab>
              }
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              {utils.reload !== true ? (
                this.state.profilePhoto !== null ? (
                  <Avatar
                    src={this.state.profilePhoto}
                    alt={`${this.state.firstName} ${this.state.lastName}`}
                    style={{ width: 150, height: 150 }}
                  />
                ) : (
                  <Avatar style={{ width: 150, height: 150 }}>
                    {this.state.firstName[0] + this.state.lastName[0]}{" "}
                  </Avatar>
                )
              ) : (
                <Avatar style={{ width: 150, height: 150 }} />
              )}
            </Badge>
          </Grid>

          <List>
            {userDataList.map((userDataItem) => (
              <ListItem key={userDataItem.id}>
                <ListItemText
                  primary={userDataItem.label}
                  secondary={userDataItem.value}
                />

                <ListItemSecondaryAction>
                  {!userDataItem.isEditable ? null : (
                    <IconButton
                      aria-label={`Edit ${userDataItem.label}`}
                      onClick={() => this.updateUserData(userDataItem.id)}
                    >
                      <PencilIcon />
                    </IconButton>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          {/* Action Group */}
          <div className="user-profile-edit-footer-action-group">
            <ReallosButton onClick={() => this.cancelEdits()}>
              Cancel
            </ReallosButton>
            <ReallosButton primary onClick={() => this.submitEdits()}>
              Save
            </ReallosButton>
          </div>
        </SideDrawer>

        <ImgUploadModal
          dismissCallback={() => {
            this.setState({
              modalOpen: false,
            });
          }}
          visible={this.state.modalOpen}
          onSuccessCallback={(url) => {
            this.setState({ profilePhoto: url });
            this.props.updatePhotoAction(url);
            this.props.dismissCallback();
          }}
        />

        {this.renderUpdateUserDataModal(this.state.updateModalType)}
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(UserProfileEditDrawer);
