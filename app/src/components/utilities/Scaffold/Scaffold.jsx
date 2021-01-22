import React from 'react';
import PropTypes from 'prop-types';
import { muiThemeOptions } from '../../../utils';
import { Container, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { BottomNav } from '../core';
import './Scaffold.css';

/**
 * `Scaffold` encloses all the children components of
 * a page and automatically manages page margins and styling.
 *
 * Usage Examples
 * --------------
 *
 * @example
 *
 * ```jsx
 * // Scaffold a basic page
 * <Scaffold>
 *     <MyComponent />
 * </Scaffold>
 *
 * // Scaffold a page with gradient background
 * <Scaffold bgVariant="gradient">
 *     <MyComponent />
 * </Scaffold>
 *
 * // Scaffold a page with bottom navigation bar
 * <Scaffold bottomNav>
 *     <MyComponent />
 * </Scaffold>
 * ```
 *
 * @augments {React.Component<Props>}
 */
class Scaffold extends React.Component {
  static propTypes = {
    /**
     * Sets the page background based on the requested
     * variant.
     *
     * _(Default: "plain")_
     */
    bgVariant: PropTypes.oneOf(['plain', 'gradient']),

    /**
     * If set to `true`, the page would include a
     * bottom navigation bar.
     * 
     * _(Default: `false`)_
     */
    bottomNav: PropTypes.bool,

    /**
     * CSS class name to be applied to this component
     */
    className: PropTypes.string
  }

  cleanupBodyClassNames() {
    // Remove `body` classes associated with this component
    document.body.classList.remove('reallos-gradient-bg');
  }

  componentDidMount() {
    if (this.props.bgVariant === 'gradient') {
      document.body.classList.add('reallos-gradient-bg');
    }
    else {
      this.cleanupBodyClassNames();
    }
  }

  componentWillUnmount() {
    this.cleanupBodyClassNames();
  }

  render() {
    const { children, className='', bottomNav=false, bgVariant='plain' } = this.props;

    let InnerContent = (
      <div style={{
        marginBottom: bottomNav ? 90 : 'unset'
      }}>
        {bottomNav && <BottomNav />}
      
        <Container
          className={className}
          style={{
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 20,
            paddingBottom: 20
          }}
        >
          {children}
        </Container>
      </div>
    );

    if (bgVariant === 'gradient') {
      let customMuiTheme;
      let customMuiThemeOptions = muiThemeOptions;

      customMuiThemeOptions.palette.type = 'dark';
      customMuiThemeOptions.palette.primary = {
        main: '#ffffff'
      };

      customMuiTheme = createMuiTheme(customMuiThemeOptions);

      return (
        <ThemeProvider theme={customMuiTheme}>
          {InnerContent}
        </ThemeProvider>
      )
    }
    else {
      return InnerContent;
    }
  }
}

export default Scaffold;
