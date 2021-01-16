import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import NavBar from '../../navbar/navbar';
import NavRail from '../../navigation_rail/NavRail';
import './Scaffold.css';

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
         * If set to `true`, the page would include
         * a navigation bar.
         */
        navBar: PropTypes.bool,

        /**
         * If set to `true`, the page would include
         * a navigation rail.
         */
        navRail: PropTypes.bool,
    }

    _noop() {
        return () => {};
    }

    render() {
        let { children, navBar=false, navRail=false } = this.props;
        let navRailClassName = navRail ? 'scaffold-navrail' : '';

        return (
            <div className={`scaffold-root ${navRailClassName}`}>
                <Container>
                    {(navBar) ? <NavBar /> : this._noop()}
                    {(navRail) ? <NavRail /> : this._noop()}

                    {children}
                </Container>
            </div>
        )
    }
}

export default Scaffold;
