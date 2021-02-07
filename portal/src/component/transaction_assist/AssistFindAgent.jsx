import React from 'react';
import AssistAccordion from './AssistAccordion';
import { SearchIcon } from '@primer/octicons-react';


class AssistFindAgent extends React.Component {
  render() {
    return (
      <AssistAccordion
        isStepComplete={false}
        AccordionStepIcon={<SearchIcon size={23} />}
        title="Find an agent"
      >
        {/*  */}
      </AssistAccordion>
    )
  }
}

export default AssistFindAgent;
