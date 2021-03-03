import React from "react";
import PropTypes from "prop-types";
import { getRoleLabel } from "../../utils";
import { Avatar, Card, Grid } from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/PhoneOutlined";
import MailIcon from "@material-ui/icons/MailOutlined";
import "./PeopleInvolvedCard.css";

/**
 * Renders a card for a given person for
 * displaying in People Involved page
 *
 * @augments {React.Component<Props>}
 */
class PeopleInvolvedCard extends React.Component {
  static propTypes = {
    /**
     * Object containing a person's details
     */
    personDetails: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      role: PropTypes.string,
      organization: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      profilePicUrl: PropTypes.string,
    }),

    /**
     * Callback function called when send mail
     * modal is requested.
     */
    onSendMail: PropTypes.func,

    /**
     * Index of the item in rendered grid. Required
     * for staggered animation.
     *
     * _(Default: 0)_
     */
    itemIndex: PropTypes.number,
  };

  /**
   * Returns a formatted phone number.
   * @returns {string}
   */
  get getFormattedPhoneNumber() {
    return this.props.personDetails.Phone.replace(
      /(\d{3})(\d{3})(\d{4})/,
      "$1-$2-$3"
    );
  }

  render() {
    let { personDetails, onSendMail = () => {}, itemIndex = 0 } = this.props;
    return (
      <Grid
        className="people-involved-card-root"
        item
        xs={12}
        sm={12}
        md={6}
        lg={4}
        key={personDetails.id}
        style={{
          opacity: 0,
          animation: "slide-up-anim 150ms ease-out forwards",
          animationDelay: `${itemIndex * 30}ms`,
        }}
      >
        <div className="people-involved-card-outer">
          <Card className="people-involved-card">
            <div className="people-involved-card-avatar">
              <Avatar src={personDetails.photoUrl} />
            </div>

            <div className="people-involved-card-details-wrapper">
              <h2 className="people-involved-card-name">
                {personDetails.FirstName + " " + personDetails.LastName}
              </h2>

              <div className="people-involved-card-role">
                {getRoleLabel(personDetails.Role)}
                {personDetails.Company ? ` ● ${personDetails.Company}` : ""}
              </div>

              <div className="people-involved-card-contact-details">
                <div className="people-involved-card-phone">
                  <PhoneIcon style={{ fontSize: 24 }} />
                  +1 {this.getFormattedPhoneNumber}
                </div>

                <div className="people-involved-card-email">
                  <MailIcon style={{ fontSize: 24 }} />

                  <div className="people-involved-card-email-content">
                    {personDetails.Email}
                    <button className="link" onClick={onSendMail}>
                      Send Mail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Grid>
    );
  }
}

export default PeopleInvolvedCard;
