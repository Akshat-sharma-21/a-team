import { useEffect, useState } from "react";
import { Avatar, CircularProgress, Divider } from "@material-ui/core";
import { Scaffold, ReallosButton } from "../../utilities/core";
import { useParams, useHistory } from "react-router";
import { fetchProfessional } from "../../../actions/userActions";
import HomeImage from "../../../assets/signin_home.png";
import "./SignUp.css";

function ConnectionSignup() {
  let history = useHistory();
  let { id } = useParams(); // getting the Professional Id
  let [professional, setProfessional] = useState(null); // To store Professional's info
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    if (professional === null) {
      setLoading(true);
      fetchProfessional(id)
        .then((pro) => {
          setProfessional(pro);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          window.location.href = "/signin";
        });
    }
  }, []);
  return (
    <Scaffold bgVariant="gradient">
      <h2 className="signin-top-subheading">Let's make</h2>
      <div className="signin-top-heading-group">
        <div className="signin-top-heading">
          <h1>Real Estate, Real Easy!</h1>
        </div>
        <div style={{ textAlign: "center" }}>
          <img src={HomeImage} alt="" width="100%" height="auto" />
        </div>
      </div>
      {loading && (
        <div className="connection-signup-loading-div">
          <CircularProgress />
        </div>
      )}
      {professional && (
        <div className="connection-professional-div">
          {professional.PhotoUrl ? (
            <Avatar
              src={professional.PhotoUrl}
              className="connection-professional-avatar"
            />
          ) : (
            <Avatar className="connection-professional-avatar">
              {professional.FirstName[0] + " " + professional.LastName[0]}
            </Avatar>
          )}
          <div
            style={{
              marginTop: "5vh",
              textAlign: "center",
              fontSize: "23px",
              marginBottom: "3vh",
            }}
          >
            Start your Home Buying Journey with {professional.FirstName} as your
            Agent
          </div>
          <div className="signin-form-group-button">
            <ReallosButton
              primary
              fullWidth
              variant="light"
              className="connection-lets-go-btn"
              onClick={() =>
                history.push("/signup", {
                  professional: { ...professional, id: id },
                })
              }
            >
              Let's Go
            </ReallosButton>
          </div>
          <Divider
            style={{
              backgroundColor: "#ffffff",
              height: 1,
              width: "60%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "3.5vh",
            }}
          />
          <div style={{ marginTop: "2.8vh" }}>Already have an account?</div>
          <div
            style={{ textAlign: "center", marginTop: "13px", width: "50vw" }}
          >
            <ReallosButton
              primary
              dense
              variant="light"
              innerContentColor="#1dadee"
              onClick={() =>
                history.push("/signin", {
                  professional: { ...professional, id: id },
                })
              }
            >
              Signin
            </ReallosButton>
          </div>
        </div>
      )}
    </Scaffold>
  );
}

export default ConnectionSignup;
