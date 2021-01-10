import { useState } from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import "./sliderNavbar.css";
import { useHistory } from "react-router-dom";

import {
  Drawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import {
  ChevronLeftIcon,
  PackageIcon,
  FileIcon,
  PersonIcon,
  ArrowLeftIcon,
} from "@primer/octicons-react";

const navRailWidth = 300;

const listItemTextProperties = {
  color: "#2B44FF",
  marginLeft: 12,
  fontSize: 16,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: navRailWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(9) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },

  toolbarToggleOption: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1.5),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  listItemText: {
    ...listItemTextProperties,
  },
  listItemTextActive: {
    fontWeight: "bold",
    ...listItemTextProperties,
  },
}));

function SliderNavbar() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const routerLocation = useLocation();
  const transId = routerLocation.pathname.split("/")[2]; // getting the id from the pathname
  let listItems = [
    {
      icon: <PackageIcon size={30} />,
      label: "Transaction Assist",
      isActiveRoute: routerLocation.pathname.includes("assist"),
      linkTo: "/transaction/" + transId + "/assist",
    },
    {
      icon: <FileIcon size={30} />,
      label: "Paperwork",
      isActiveRoute: routerLocation.pathname.includes("/paperwork"),
      linkTo: "/transaction/" + transId + "/paperwork",
    },
    {
      icon: <PersonIcon size={30} />,
      label: "People",
      isActiveRoute: routerLocation.pathname.includes("/people"),
      linkTo: "/transaction/" + transId + "/people",
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

  const History = useHistory();
  const renderNavRailListItem = (navRailItem) => {
    const { icon, label, isActiveRoute, linkTo } = navRailItem;
    return (
      <ListItem
        button
        style={{ marginTop: 150, paddingLeft: 6 }}
        component="a"
        key={label}
        onClick={() => History.push(linkTo)}
      >
        <ListItemIcon className={isActiveRoute ? "nav-rail-icon-active" : ""}>
          <div className="nav-rail-indicator-container">
            <div
              className={
                isActiveRoute
                  ? "nav-rail-indicator-active"
                  : "nav-rail-indicator-inactive"
              }
            />
          </div>
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={label}
          classes={{
            primary: isActiveRoute
              ? classes.listItemTextActive
              : classes.listItemText,
          }}
        />
      </ListItem>
    );
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbarToggleOption}>
          <IconButton
            className={clsx({
              [classes.hide]: open,
            })}
          >
            <ArrowLeftIcon size={24} />
          </IconButton>
          <IconButton
            onClick={handleDrawerClose}
            className={clsx({
              [classes.hide]: !open,
            })}
          >
            <ChevronLeftIcon size={24} />
          </IconButton>
        </div>
        <Divider />
        <List style={{ marginTop: -20 }}>
          {listItems.map((listItemData) => renderNavRailListItem(listItemData))}
        </List>
      </Drawer>
    </div>
  );
}

export default SliderNavbar;