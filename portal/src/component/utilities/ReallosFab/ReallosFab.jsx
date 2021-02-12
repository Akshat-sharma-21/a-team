import React from 'react';
import PropTypes from 'prop-types';
import { Fab } from '@material-ui/core';
import './ReallosFab.css';


/**
 * Reallos Floating Action Button component
 * @augments {React.Component<Props>}
 */
class ReallosFab extends React.Component {
  static propTypes = {
    /**
     * Title of the Floating Action Button
     */
    title: PropTypes.string,

    /**
     * Icon to be prefixed with the `title`
     */
    LeadingIcon: PropTypes.element,

    /**
     * Callback function called when the FAB
     * is clicked
     */
    onClick: PropTypes.func
  };

  render() {
    const { title, LeadingIcon, onClick } = this.props;

    return (
      <Fab
        variant="extended"
        className="reallos-fab"
        size="large"
        onClick={onClick}
      >
        {LeadingIcon && (
          <span className="reallos-fab-icon">
            {LeadingIcon}
          </span>
        )}

        {title}
      </Fab>
    )
  }
}

export default ReallosFab;
