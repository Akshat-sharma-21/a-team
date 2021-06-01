import { useLocation, useHistory, useParams } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import "./NavRail.css";

import {
  Drawer,
  List,
  Divider,
  IconButton,
  Grid,
  Tooltip,
} from "@material-ui/core";

import {
  PackageIcon,
  FileIcon,
  PersonIcon,
  ArrowLeftIcon,
} from "@primer/octicons-react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  hide: {
    display: "none",
  },

  toolbarToggleOption: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1.5),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

const NavRailTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[7],
    borderRadius: 10,
    fontFamily: "Gilroy",
    fontSize: 18,
    padding: "10px 20px",
    marginLeft: 30,
  },
}))(Tooltip);

function NavRail(props) {
  const classes = useStyles();
  const history = useHistory();
  const routerLocation = useLocation();
  const { tid } = useParams();
  let listItems = [
    {
      icon: <PackageIcon size={30} />,
      label: "Transaction Assist",
      isActiveRoute: routerLocation.pathname.includes("assist"),
      linkTo: `/transactions/${tid}/assist`,
    },
    {
      icon: <FileIcon size={30} />,
      label: "Documents",
      isActiveRoute: routerLocation.pathname.includes("/document"),
      linkTo: `/transactions/${tid}/documents`,
    },
    {
      icon: <PersonIcon size={30} />,
      label: "People",
      isActiveRoute: routerLocation.pathname.includes("/people"),
      linkTo: `/transactions/${tid}/people`,
    },
  ];

  /**
   * Builds a list item for navigation rail.
   *
   * @param {object} navRailItem
   * Object containing properties for building a
   * navigation rail list item.
   *
   * @param {JSX.Element} navRailItem.icon
   * A JSX element which has to be displayed as
   * an icon on the navigation rail
   *
   * @param {string} navRailItem.label
   * Label for the list item.
   *
   * @param {boolean} navRailItem.isActiveRoute
   * Applies a styling to the list item show
   * if a route is active.
   *
   * @param {string} navRailItem.linkTo
   * The URL to direct the user when the list item
   * is clicked.
   */
  const renderNavRailListItem = (navRailItem) => {
    const { icon, label, isActiveRoute, linkTo } = navRailItem;
    return (
      <NavRailTooltip title={label} placement="right">
        <button
          aria-label={label}
          onClick={() => history.push(linkTo)}
          className="nav-rail-item"
        >
          <div
            className={
              "nav-rail-item-icon " +
              (isActiveRoute
                ? "nav-rail-item-active"
                : "nav-rail-item-inactive")
            }
          >
            {icon}
          </div>
        </button>
      </NavRailTooltip>
    );
  };

  return (
    <div className={classes.root}>
      <Drawer variant="permanent" style={{ zIndex: 0 }}>
        <div className={classes.toolbarToggleOption}>
          <div
            style={{
              marginTop: 40,
              marginBottom: 40,
            }}
          >
            <IconButton
              onClick={() => {
                window.location.href = "/transactions"; //TODO: find a better way to deal with this
              }}
            >
              <ArrowLeftIcon size={24} />
            </IconButton>
          </div>
        </div>

        <Divider
          style={{
            marginLeft: 7,
            marginRight: 7,
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
        />
        {props.Role !== null && props.Role.toUpperCase() !== "LENDER" && (
          <Grid
            container
            direction="column"
            alignItems="center"
            className="nav-rail-list-root"
          >
            <List className="nav-rail-list">
              {listItems.map((listItemData) =>
                renderNavRailListItem(listItemData)
              )}
            </List>
          </Grid>
        )}
      </Drawer>
    </div>
  );
}

export default NavRail;
