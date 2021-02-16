import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, SwipeableDrawer } from '@material-ui/core';
import './ModalSheet.css';

/**
 * Displays a Bottom Modal Sheet
 *
 * Usage Examples
 * --------------
 *
 * @example
 * ```jsx
 * // Modal sheet which closes on swipe gesture
 * <ModalSheet
 *     isOpen={isModalSheetOpen}
 *     onClose={() => closeModalSheet()}
 * >
 *     <MyComponent />
 * </ModalSheet>
 *
 * // Modal sheet which contains scrollable content
 * <ModalSheet
 *     isOpen={isModalSheetOpen}
 *     onClose={() => closeModalSheet()}
 *     shouldSwipeToClose={false}
 *     shouldLimitContentHeight
 * >
 *     <MyComponentWithScrollableContent />
 * </ModalSheet>
 * ```
 *
 * @augments {React.Component<Props>}
 */
class ModalSheet extends React.Component {
  static propTypes = {
    /**
     * CSS class to be applied to the component.
     */
    className: PropTypes.string,
    
    /**
     * If set to `true`, the modal sheet will
     * be visible.
     */
    isOpen: PropTypes.bool.isRequired,

    /**
     * If set to `false`, the modal sheet will
     * not close on swipe gestures.
     *
     * Ideal for highly descriptive content which
     * requires scrolling.
     *
     * _(Default: true)_
     */
    shouldSwipeToClose: PropTypes.bool,

    /**
     * If set to `true`, the content height will be
     * limited to 50% of the viewport height.
     * 
     * This could be used for contents that are
     * highly descriptive and would take up too much
     * of the screen real estate at once.
     * 
     * **NOTE:** For any content taking space greater than
     * 50% of viewport height, this option would make the
     * content scrollable but might get interfered with the
     * swipe-to-close gesture, thus using it in conjunction
     * with `shouldSwipeToClose` option (with a value of `false`)
     * would be ideal.
     * 
     * _(Default: false)_
     */
    shouldLimitContentHeight: PropTypes.bool,

    /**
     * Callback function called when the Modal Sheet
     * requests to be closed.
     */
    onClose: PropTypes.func.isRequired,
  }

  render() {
    const {
      children,
      className='',
      onClose,
      isOpen,
      shouldSwipeToClose=true,
      shouldLimitContentHeight=false
    } = this.props;

    const ModalSheetContent = (
      <div
        className={[
          "modal-sheet-content",
          className
        ].join(' ')}
        style={{
          maxHeight: shouldLimitContentHeight ? '50vh' : 'unset'
        }}
      >
        {children}
      </div>
    );

    if (shouldSwipeToClose) {
      return (
        <SwipeableDrawer
          className="swipeable-modal-sheet"
          anchor="bottom"
          open={isOpen}
          onClose={onClose}
          onOpen={() => {}}
          disableSwipeToOpen={true}
          PaperProps={{
            style: {
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30
            }
          }}
        >
          {ModalSheetContent}
        </SwipeableDrawer>
      )
    }
    else {
      return (
        <Drawer
          anchor="bottom"
          open={isOpen}
          onClose={onClose}
          PaperProps={{
            style: {
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30
            }
          }}
        >
          {ModalSheetContent}
        </Drawer>
      )
    }
  }
}

export default ModalSheet;
