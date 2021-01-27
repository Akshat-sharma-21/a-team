import React from 'react';
import PropTypes from 'prop-types';
import './ReallosButton.css';

/**
 * Reallos Button Component
 *
 * Usage Examples
 * --------------
 *
 * @example
 *
 * ```jsx
 * // Basic Button
 * <ReallosButton onClick={sayHello}>
 *     Say Hello!
 * </ReallosButton>
 *
 * // Primary Button
 * <ReallosButton primary onClick={sayHello}>
 *     Say Hello!
 * </ReallosButton>
 *
 * // Call-to-Action Button
 * <ReallosButton cta onClick={sayHello}>
 *     Say Hello!
 * </ReallosButton>
 *
 * // Custom width primary Button
 * <ReallosButton primary buttonWidth={200} onClick={sayHello}>
 *     Say Hello!
 * </ReallosButton>
 *
 * // Disabled primary Button
 * <ReallosButton primary disabled onClick={sayHello}>
 *     Say Hello!
 * </ReallosButton>
 * ```
 *
 * @augments {React.Component<Props>}
 */
class ReallosButton extends React.Component {
    static propTypes = {
        /**
         * If set to `true`, the button will use primary
         * button styling.
         *
         * When having a group of buttons, use atmost
         * one primary button which will convey the user
         * the default or recommended action.
         *
         * _(Default: `false`)_
         */
        primary: PropTypes.bool,

        /**
         * If set to `true`, the button will be disabled,
         * i.e, `onClick` will be ignored.
         *
         * _(Default: `false`)_
         */
        disabled: PropTypes.bool,

        /**
         * If set to `true`, the button will be optimized
         * for a Call-to-Action button. Width of the CTA
         * will override if `buttonWidth` is used.
         *
         * _(Default: `false`)_
         */
        cta: PropTypes.bool,

        /**
         * If set to `true`, the button will take up the
         * full available width of the parent component.
         * 
         * NOTE: Overrides `buttonWidth` prop.
         * 
         * _(Default: `false`)_
         */
        fullWidth: PropTypes.bool,

        /**
         * Set the width of button.
         * _(Default: `auto`)_
         */
        buttonWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

        /**
         * Function to execute when pressed.
         */
        onClick: PropTypes.func
    }

    render() {
        let {
            children,
            fullWidth=false,
            primary,
            disabled,
            cta,
            buttonWidth='auto',
            onClick=()=>{}
        } = this.props;

        let buttonCTAClassName = (cta) ? 'reallos-button-cta' : '';
        let buttonClassName = (primary)
                                ? 'reallos-button-primary'
                                : 'reallos-button-secondary';

        return (
            <button
                onClick={onClick}
                disabled={disabled}
                className={`reallos-button ${buttonClassName} ${buttonCTAClassName}`}
                style={{ width: fullWidth ? '100%' : buttonWidth }}
            >
                {children}
            </button>
        )
    }
}

export default ReallosButton;
