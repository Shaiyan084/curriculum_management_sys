import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { getAllUndergraduatePrograms } from '../../actions/program';
import { getCurrentApplicant } from '../../actions/applicant';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import Table from '../../components/Table/Table.js';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
  Checkbox
} from '@material-ui/core';

const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '0.9rem',
      marginTop: '0',
      marginBottom: '0'
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF'
    }
  },
  cardCategoryBlack: {
    '&,& a, & a:hover, & a:focus': {
      color: 'rgba(0,0,0)',
      margin: '0',
      fontSize: '0.9rem',
      marginTop: '0',
      marginBottom: '0'
    },
    '& a,& a:hover,& a:focus': {
      color: '#000000'
    }
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    fontSize: '1.3rem',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1'
    }
  }
};

const useStyles = makeStyles(styles);

const UndergraduateProgramList = ({
  getCurrentApplicant,
  getAllUndergraduatePrograms,
  history,
  applicant: { loading, applicant },
  program: { undergraduatePrograms },
  auth
}) => {
  const classes = useStyles(styles);

  const [undergraduateProgramsList, setUndergraduateProgramsList] = useState(
    []
  );

  const getUndergraduatePrograms = () => {
    let res = [];
    let i = 1;

    undergraduateProgramsList.forEach(program => {
      res = [
        ...res,
        ,
        [
          `${i}`,
          program.name,
          program.department.name,
          program.description,
          program.duration.yearly,
          <Fragment>
            <Checkbox />
          </Fragment>
        ]
      ];
      i++;
    });
    return res;
  };

  const [
    getAllUndergraduateProgramsCalled,
    setGetAllUndergraduateProgramsCalled
  ] = useState(false);

  useEffect(() => {
    if (!getAllUndergraduateProgramsCalled) {
      getAllUndergraduatePrograms();
      setGetAllUndergraduateProgramsCalled(true);
    }

    setUndergraduateProgramsList(
      !loading && undergraduatePrograms.length > 0 ? undergraduatePrograms : []
    );
  }, [undergraduatePrograms]);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>
              Undergraduate Programs Offered
            </h4>
            <p className={classes.cardCategoryWhite}>
              Select from the list of all undergraduate programs offered
            </p>
          </CardHeader>
          <CardBody>
            {undergraduateProgramsList.length > 0 ? (
              <Table
                tableHeaderColor='primary'
                tableHead={[
                  'S.No',
                  'Name',
                  'Department',
                  'Description',
                  'Duration (years)',
                  'Select'
                ]}
                tableData={getUndergraduatePrograms()}
              />
            ) : (
              <div className='text-center imp-message'>No programs found</div>
            )}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

UndergraduateProgramList.propTypes = {
  getCurrentApplicant: PropTypes.func.isRequired,
  getAllUndergraduatePrograms: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  applicant: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  program: state.program,
  applicant: state.applicant,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getAllUndergraduatePrograms,
  getCurrentApplicant
})(withRouter(UndergraduateProgramList));
