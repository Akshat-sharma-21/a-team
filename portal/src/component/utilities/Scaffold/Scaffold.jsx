import React from "react";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";
import NavBar from "../../navbar/Navbar";
import NavRail from "../../navrail/NavRail";
import "./Scaffold.css";

/**
 * `Scaffold` is the root level component which encloses
 * all the DOM children of a page. `Scaffold` automatically
 * manages margin for the page content based on additional
 * components like `NavRail`. It also provides a way to
 * directly include such additional components to the page
 * without importing it separately for each page component.
 *
 * Usage Examples
 * --------------
 *
 * @example
 *
 * ```jsx
 * // Scaffold a page with Navigation Bar
 * <Scaffold navBar>
 *     ...
 * </Scaffold>
 *
 * // Scaffold a page with Navigation Bar and Nav Rail
 * <Scaffold navBar navRail>
 *     ...
 * </Scaffold>
 * ```
 *
 * @augments {React.Component<Prop>}
 */
class Scaffold extends React.Component {
  static propTypes = {
    /**
     * CSS class name to be applied to this component
     */
    className: PropTypes.string,

    /**
     * If set to `true`, the page would include
     * a navigation bar.
     */
    navBar: PropTypes.bool,

    /**
     * If set to `true`, the page would include
     * a navigation rail.
     */
    navRail: PropTypes.bool,

    /**
     * Props to be sent to `NavRail` component.
     */
    navRailProps: PropTypes.shape({
      /**
       * Specifies the link to follow when the
       * Back Button is pressed.
       *
       * _(Default: /transactions)_
       */
      backButtonRoute: PropTypes.string,
    }),
  };

  _noop() {
    return () => {};
  }

  render() {
    let {
      children,
      className = "",
      navBar = false,
      navRail = false,
      userRole = "",
    } = this.props;
    let navRailClassName = navRail ? "scaffold-navrail" : "";
    let navRailProps = Object.assign(
      {
        backButtonRoute: "/transactions",
      },
      this.props.navRailProps
    );

    let { backButtonRoute } = navRailProps;

    return (
      <div className={`scaffold-root ${navRailClassName} ${className}`}>
        <Container>
          {navBar ? <NavBar sticky /> : this._noop()}
          {navRail ? (
            <NavRail backButtonRoute={backButtonRoute} Role={userRole} />
          ) : (
            this._noop()
          )}

          {children}
        </Container>
      </div>
    );
  }
}

export default Scaffold;
