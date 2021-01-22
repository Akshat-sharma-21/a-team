import React from 'react';
import { List } from '@material-ui/core';
import { ChecklistIcon, FileIcon, HomeIcon } from '@primer/octicons-react';
import { Link } from 'react-router-dom';
import './BottomNav.css';

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
        isActive: true,
        label: 'Documents',
        link: './'
      },
      {
        icon: <HomeIcon size={iconSize} />,
        isActive: false,
        label: 'Home',
        link: './'
      },
      {
        icon: <ChecklistIcon size={iconSize} />,
        isActive: false,
        label: 'Tasks',
        link: './'
      },
    ];
    
    return (
      <div className="bottom-nav-root">
        <List className="bottom-nav-items-group">
          {navItems.map(navItem => (
            <Link to={navItem.link} key={navItem.label}>
              <button
                className={`bottom-nav-item ${navItem.isActive ? 'active' : ''}`}
                aria-label={`${navItem.label}`}
                aria-selected={navItem.isActive}
              >
                {navItem.icon}
              </button>
            </Link>
          ))}
        </List>
      </div>
    )
  }
}

export default BottomNav;
    