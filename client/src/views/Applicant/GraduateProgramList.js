import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getAllGraduatePrograms } from '../../actions/program';
import {
  getCurrentApplicant,
  applyProgram,
  removeProgram
} from '../../actions/applicant';
import { makeStyles } from '@material-ui/core/styles';
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

const GraduateProgramList = ({
  getCurrentApplicant,
  applyProgram,
  removeProgram,
  getAllGraduatePrograms,
  applicant: { loading, applicant },
  program: { loading: graduateProgramsLoading, graduatePrograms }
}) => {
  const classes = useStyles(styles);

  const [graduateProgramsList, setGraduateProgramsList] = useState([]);

  const getGraduatePrograms = () => {
    let res = [];
    let i = 1;

    graduateProgramsList.forEach(program => {
      if (program.status) {
        res = [
          ...res,
          [
            `${i}`,
            program.name,
            program.department.name,
            program.criteria.minCGPA,
            program.duration.yearly,
            <Fragment>
              <Checkbox
                checked={
                  applicant &&
                  applicant.appliedPrograms
                    .map(program => program.programme)
                    .indexOf(program._id) !== -1
                }
                onChange={() =>
                  applicant.appliedPrograms
                    .map(program => program.programme)
                    .indexOf(program._id) !== -1
                    ? removeProgram(program._id)
                    : applyProgram(program._id)
                }
              />
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
  }, []);

  const [
    getAllGraduateProgramsCalled,
    setGetAllGraduateProgramsCalled
  ] = useState(false);

  useEffect(() => {
    if (!getAllGraduateProgramsCalled) {
      getAllGraduatePrograms();
      setGetAllGraduateProgramsCalled(true);
    }

    setGraduateProgramsList(
      !graduateProgramsLoading && graduatePrograms.length > 0
        ? graduatePrograms
        : []
    );
  }, [graduatePrograms]);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>
              Graduate Programs Offered
            </h4>
            <p className={classes.cardCategoryWhite}>
              Select from the list of all graduate programs offered
            </p>
          </CardHeader>
          <CardBody>
            {graduateProgramsList.length > 0 ? (
              <Table
                tableHeaderColor='primary'
                tableHead={[
                  'S.No',
                  'Name',
                  'Department',
                  'Minimum CGPA Required',
                  'Duration (years)',
                  'Select'
                ]}
                tableData={getGraduatePrograms()}
              />
            ) : (
              <div className='text-center imp-message'>No programs found</div>
            )}
            &nbsp;
            <GridItem xs={12} sm={12} md={12}>
              <Link
                to='/applicant/graduate-personal-details'
                className='text-decoration-none'
              >
                <Button
                  color='secondary'
                  variant='contained'
                  type='submit'
                  size='large'
                >
                  Next
                </Button>
              </Link>
              &nbsp;
              <Link
                to={'/applicant/dashboard'}
                className='text-decoration-none'
              >
                <Button
                  color='primary'
                  variant='contained'
                  type='submit'
                  size='large'
                >
                  Back
                </Button>
              </Link>
            </GridItem>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

GraduateProgramList.propTypes = {
  getCurrentApplicant: PropTypes.func.isRequired,
  applyProgram: PropTypes.func.isRequired,
  removeProgram: PropTypes.func.isRequired,
  getAllGraduatePrograms: PropTypes.func.isRequired,
  applicant: PropTypes.object.isRequired,
  program: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  applicant: state.applicant,
  program: state.program
});

export default connect(mapStateToProps, {
  getAllGraduatePrograms,
  getCurrentApplicant,
  applyProgram,
  removeProgram
})(withRouter(GraduateProgramList));
