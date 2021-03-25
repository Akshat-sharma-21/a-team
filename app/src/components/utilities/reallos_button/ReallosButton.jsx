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
 * // Light variant primary button
 * <ReallosButton primary variant="light" onClick={sayHello}>
 *     Say Hello!
 * </ReallosButton>
 *
 * // Primary variant (uses primary colors) primary button
 * <ReallosButton primary variant="primary" onClick={sayHello}>
 *     Say Hello!
 * </ReallosButton>
 *
 * // Call-to-Action Button
 * <ReallosButton fullwidth primary onClick={sayHello}>
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
         * CSS class name to be applied to this component
         */
        className: PropTypes.string,

        /**
         * Adjusts the styling of button based on the
         * preferred button variant.
         *
         * _(Default: "gradient")_
         */
        variant: PropTypes.oneOf(['gradient', 'primary', 'light']),

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
         * Color to be applied to inner child content
         * like text and icons. Accepts keyword "primary"
         * and "auto". Also accepts valid CSS color.
         *
         * Only affects "light" variant
         *
         * @description Option "auto" currently behaves
         * differently on Firefox
         *
         * _(Default: "auto")_
         */
        innerContentColor: PropTypes.oneOf([
            "auto",
            "primary",
            PropTypes.string
        ]),

        /**
         * If set to `true`, the button will be disabled,
         * i.e, `onClick` will be ignored.
         *
         * _(Default: `false`)_
         */
        disabled: PropTypes.bool,

        /**
         * If set to `true`, the vertical padding of the
         * button will be decreased to make it look denser.
         *
         * _(Default: `false`)_
         */
        dense: PropTypes.bool,

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
         *
         * Usage of `buttonWidth` is not recommended.
         * If required, the left and right padding of the button
         * can be adjusted accordingly or a min-width could be
         * specified. Use the `className` for referencing
         * the particular button.
         *
         * _(Default: `auto`)_
         *
         * @deprecated
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
            className='',
            innerContentColor='auto',
            variant='gradient',
            primary=false,
            disabled=false,
            dense=false,
            fullWidth=false,
            buttonWidth='auto',
            onClick=()=>{}
        } = this.props;

        let buttonVariantClassName = '';
        let buttonDenseClassName = (dense) ? 'reallos-button-dense' : '';
        let noAutoColorClassName = (innerContentColor !== 'auto')
                                    ? 'reallos-button-no-auto-text-color'
                                    : '';

        let buttonClassName = (primary)
                                ? 'reallos-button-primary'
                                : 'reallos-button-secondary';

        switch (variant) {
            case 'light':
                buttonVariantClassName = 'reallos-button-variant-light';
                break;
            case 'primary':
                buttonVariantClassName = 'reallos-button-variant-primary';
                break;
            default:
                buttonVariantClassName = 'reallos-button-variant-gradient';
        }

        return (
            <button
                onClick={onClick}
                disabled={disabled}
                className={[
                    'reallos-button',
                    buttonClassName,
                    buttonDenseClassName,
                    buttonVariantClassName,
                    className
                ].join(' ')}
                style={{ width: fullWidth ? '100%' : buttonWidth }}
            >
                <div
                    className={[
                        'reallos-button-child-wrapper',
                        noAutoColorClassName
                    ].join(' ')}

                    style={{
                        color: (
                            primary &&
                            variant === 'light' &&
                            !['auto', 'primary'].includes(innerContentColor)
                        )
                            ? innerContentColor
                            : '',

                        WebkitTextFillColor:
                            (innerContentColor !== 'auto')
                                ? 'unset'
                                : '',
                    }}
                >
                    {children}
                </div>
            </button>
        )
    }
}

export default ReallosButton;
