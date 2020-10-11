import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  getAllUndergraduateApplicants,
  getCurrentApplicant
} from '../../actions/applicant';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
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

const ManageApplicant = ({
  getAllUndergraduateApplicants,
  getCurrentApplicant,
  applicant: {
    loading: undergraduateApplicantsLoading,
    undergraduateApplicants,
    applicant
  },
  auth: { user }
}) => {
  const classes = useStyles(styles);

  const [undergraduateApplicantList, setUndergraduateApplicantList] = useState(
    []
  );

  const getUndergraduateApplicants = () => {
    let res = [];
    let i = 1;

    undergraduateApplicantList.forEach(undergraduateApplicant => {
      if (
        undergraduateApplicant.applicationForwarded &&
        undergraduateApplicant.appliedPrograms.map(
          program => program.department === user.department
        )
      ) {
        res = [
          ...res,
          [
            `${i}`,
            undergraduateApplicant.personalDetails.name,
            undergraduateApplicant.personalDetails.fatherName,
            undergraduateApplicant.personalDetails.email,
            undergraduateApplicant.educationDetails.universityTestScore,
            undergraduateApplicant.educationDetails.totalAggregate,
            <Fragment>
              <Link
                to={`/coordinator/applicant-details/${undergraduateApplicant._id}`}
                className='text-decoration-none'
              >
                <Button
                  variant='contained'
                  className='margin-left-right margin-top-bottom button-function'
                >
                  View
                </Button>
              </Link>
            </Fragment>
          ]
        ];
        i++;
      }
    });
    return res;
  };

  const [getCurrentApplicantCalled, setGetCurrentApplicantCalled] = useState(
    false
  );

  useEffect(() => {
    if (!getCurrentApplicantCalled) {
      getCurrentApplicant();
      setGetCurrentApplicantCalled(true);
    }
  }, [applicant]);

  const [
    getAllUndergraduateApplicantsCalled,
    setGetAllUndergraduateApplicantsCalled
  ] = useState(false);

  useEffect(() => {
    if (!getAllUndergraduateApplicantsCalled) {
      getAllUndergraduateApplicants();
      setGetAllUndergraduateApplicantsCalled(true);
    }

    setUndergraduateApplicantList(
      !undergraduateApplicantsLoading && undergraduateApplicants.length > 0
        ? undergraduateApplicants
        : []
    );
  }, [undergraduateApplicants]);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Education Details</h4>
            <p className={classes.cardCategoryWhite}>
              Fill in the information below update your education details
            </p>
          </CardHeader>
          <CardBody>
            {undergraduateApplicantList.length > 0 ? (
              <Table
                tableHeaderColor='primary'
                tableHead={[
                  'S.No',
                  'Name',
                  'Father Name',
                  'Email',
                  'University Test Score',
                  'Total Aggregate (%)',
                  'Actions'
                ]}
                tableData={getUndergraduateApplicants()}
              />
            ) : (
              <div className='text-center imp-message'>No applicants found</div>
            )}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

ManageApplicant.propTypes = {
  getCurrentApplicant: PropTypes.func.isRequired,
  getAllUndergraduateApplicants: PropTypes.func.isRequired,
  applicant: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  applicant: state.applicant,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getCurrentApplicant,
  getAllUndergraduateApplicants
})(withRouter(ManageApplicant));
