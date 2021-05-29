import React from "react";
import PropTypes from "prop-types";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { DotFillIcon, CheckIcon } from "@primer/octicons-react";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Divider,
  Typography,
} from "@material-ui/core";

/**
 * Display accordion for Transaction Assist.
 * @augments {React.Component<Props>}
 */
class AssistAccordion extends React.Component {
  static propTypes = {
    /**
     * Sets the leading icon of the accordion as per
     * the completion status of the step.
     */
    isStepComplete: PropTypes.bool,

    /**
     * Icon element to be prefixed with title.
     */
    AccordionStepIcon: PropTypes.element,

    /**
     * Title to be displayed on the accordion.
     */
    title: PropTypes.string,

    /**
     * Index of the accordion on the list.
     * Used for applying staggered animation.
     *
     * _(Default: 0)_
     */
    itemIndex: PropTypes.number,
  };

  render() {
    let {
      children,
      isStepComplete,
      AccordionStepIcon,
      title,
      itemIndex = 0,
    } = this.props;

    return (
      <Grid
        item
        style={{
          opacity: 0,
          animation: "slide-up-anim 200ms ease-out forwards",
          animationDelay: `${itemIndex * 75}ms`,
        }}
      >
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container direction="row" alignItems="center" spacing={4}>
              <Grid
                item
                style={{
                  marginLeft: 5,
                  marginRight: 3,
                  color: !isStepComplete ? "#666666" : "#0dd663",
                }}
              >
                {!isStepComplete ? (
                  <DotFillIcon size={23} />
                ) : (
                  <CheckIcon size={23} />
                )}
              </Grid>

              <Divider orientation="vertical" style={{ height: 50 }} />

              <Grid item>
                <Grid container direction="row" alignItems="center" spacing={3}>
                  <Grid item>{AccordionStepIcon}</Grid>
                  <Grid item>
                    <Typography className="assist-accordion-heading">
                      {title}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </AccordionSummary>

          <AccordionDetails
            className="assist-accordion-details-root"
            style={{ height: "auto" }}
          >
            {children}
          </AccordionDetails>
        </Accordion>
      </Grid>
    );
  }
}

export default AssistAccordion;
