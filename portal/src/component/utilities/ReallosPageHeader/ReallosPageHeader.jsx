import React from 'react';
import PropTypes from 'prop-types';
import { HomeIcon, PackageIcon } from '@primer/octicons-react';
import { Box, Grid } from '@material-ui/core'


/**
 * Renders Page Header
 * @augments {React.Component<Props>}
 */
class ReallosPageHeader extends React.Component {
  static propTypes = {
    /**
     * Name of the transaction
     */
    transactionName: PropTypes.string,

    /**
     * Name of the page
     */
    pageName: PropTypes.string,
  };

  render() {
    const { transactionName, pageName } = this.props;

    return (
      <Box component="div" paddingTop={6} paddingBottom={1}>
        <Grid
          container
          direction="row"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            {(transactionName)
              ? <PackageIcon size={28} />
              : <HomeIcon size={28} />
            }
          </Grid>
          <Grid item style={{
            fontSize: 20
          }}>
            {transactionName ?? 'Home'}
          </Grid>
        </Grid>
        <h1 style={{
          marginTop: 15,
          marginBottom: 10,
        }}>
          {pageName}
        </h1>
      </Box>
    )
  }
}

export default ReallosPageHeader;
