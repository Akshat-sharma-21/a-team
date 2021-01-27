import React from "react";
import PropTypes from "prop-types";
import { IconButton } from "@material-ui/core";
import { XIcon } from "@primer/octicons-react";
import "./Modal.css";

/**
 * Display a modal
 * @augments {React.Component<Props>}
 */
class ReallosModal extends React.Component {
  static propTypes = {
    /**
     * CSS class name to be applied to this component
     */
    className: PropTypes.string,

    /**
     * If set to `true`, a raw modal will be returned, i.e.,
     * the styling and default elements (like `title`)
     * will not be set by default.
     *
     * _(Default: `false`)_
     */
    rawModal: PropTypes.bool,

    /**
     * Title to be displayed for the Modal. Will be ignored
     * if `bootstrapModal` is set to `false`
     */
    title: PropTypes.string.isRequired,

    /**
     * Specify whether the modal is visible
     */
    visible: PropTypes.bool.isRequired,

    /**
     * Callback function which is called when close button
     * is pressed.
     *
     * This function typically should contain code to set
     * visiblity to false. If left unspecified, the close
     * button won't show up.
     */
    dismissCallback: PropTypes.func,

    /**
     * Set width of the modal. (_Default: 450px_)
     */
    modalWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Set height of the modal. By default the height
     * will automatically be determined by the content
     * inside the modal.
     *
     * (_Usage not recommended_)
     */
    modalHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Remove backdrop blur effect when rendering the
     * modal. You might want to disable the blur
     * effect for performance reasons.
     *
     * (_Default: false_)
     */
    disableBackdropBlur: PropTypes.bool,
  };

  render() {
    let {
      className='',
      rawModal=false,
      title,
      visible,
      dismissCallback,
      modalWidth,
      modalHeight,
      disableBackdropBlur=false,
      children,
    } = this.props;

    let modalTemplateClassName = !rawModal ? 'modal-basic' : '';
    let modalDisableBackdropBlurClassName = disableBackdropBlur ? 'modal-no-bg-blur' : '';

    return (
      <>
        <div
          className={[
            'modal-bg',
            modalDisableBackdropBlurClassName,
            modalTemplateClassName
          ].join(' ')}
          visible={visible.toString()}
          aria-modal="true"
        >
          <div
            className={`modal ${className}`}
            style={{ width: modalWidth, height: modalHeight }}
          >
            <div className="modal-container">
              {dismissCallback && (
                <div className="modal-close-btn">
                  <IconButton onClick={dismissCallback}>
                    <XIcon size="small" />
                  </IconButton>
                </div>
              )}
              {!rawModal && <h1 className="modal-heading">{title}</h1>}
              {children}
            </div>
          </div>
        </div>
      </>
    );
  }
}

/**
 * Component to render action footer bar for modal.
 * @augments React.Component<Props>
 */
class ModalActionFooter extends React.Component {
  static propTypes = {
    /**
     * Specify where to align the action items.
     * The allowed values are `left` & `right`.
     *
     * (_Default: "right"_)
     */
    actionPlacement: PropTypes.oneOf(["left", "right"]),

    /**
     * Top margin for this component
     *
     * (_Default: 30_)
     */
    marginTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  render() {
    let { actionPlacement, marginTop, children } = this.props;

    return (
      <div
        className="modal-action-group"
        actionPlacement={actionPlacement}
        style={{ marginTop }}
      >
        {children}
      </div>
    );
  }
}

export default ReallosModal;
export { ModalActionFooter };
