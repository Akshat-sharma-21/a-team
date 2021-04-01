import React from "react";
import { List } from "@material-ui/core";
import { ChecklistIcon, FileIcon, HomeIcon } from "@primer/octicons-react";
import { Link } from "react-router-dom";
import "./BottomNav.css";

/**
 * Bottom Navigation Bar Component
 * @augments {React.Component<Props>}
 */
class BottomNav extends React.Component {
  render() {
    const iconSize = 22;
    const navItems = [
      {
        icon: <FileIcon size={iconSize} />,
        isActive: this.props.Active === "Documents" ? true : false,
        label: "Documents",
        link: "./documents",
      },
      {
        icon: <HomeIcon size={iconSize} />,
        isActive: this.props.Active === "Dashboard" ? true : false,
        label: "Home",
        link: "./dashboard",
      },
      {
        icon: <ChecklistIcon size={iconSize} />,
        isActive: this.props.Active === "Tasks" ? true : false,
        label: "Tasks",
        link: "./tasks",
      },
    ];

    return (
      <div className="bottom-nav-root">
        <List className="bottom-nav-items-group">
          {navItems.map((navItem) => (
            <Link to={navItem.link} key={navItem.label}>
              <button
                className={`bottom-nav-item ${
                  navItem.isActive ? "active" : ""
                }`}
                aria-label={`${navItem.label}`}
                aria-selected={navItem.isActive}
              >
                {navItem.icon}
              </button>
            </Link>
          ))}
        </List>
      </div>
    );
  }
}

export default BottomNav;
