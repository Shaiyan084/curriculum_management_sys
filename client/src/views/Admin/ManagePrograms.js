import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Table from '../../components/Table/Table.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { getAllPrograms } from '../../actions/program';
import { Link } from 'react-router-dom';

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

const ManagePrograms = ({ getAllPrograms, program: { loading, programs } }) => {
  const classes = useStyles();

  const [programsList, setProgramsList] = useState([]);

  const getPrograms = () => {
    let res = [];
    let i = 1;

    programsList.forEach(program => {
      res = [
        ...res,
        [
          `${i}`,
          program.name,
          program.department.name,
          <Fragment>
            <Link
              to={`/admin/update-program/${program._id}`}
              className='text-decoration-none'
            >
              <Button
                color='secondary'
                variant='contained'
                className='margin-left-right margin-top-bottom'
              >
                Update Programs
              </Button>
            </Link>
          </Fragment>
        ]
      ];

      i++;
    });

    return res;
  };

  const [getAllProgramsCalled, setGetAllProgramsCalled] = useState(false);

  useEffect(() => {
    if (!getAllProgramsCalled) {
      getAllPrograms();
      setGetAllProgramsCalled(true);
    }

    setProgramsList(!loading && programs.length > 0 ? programs : []);
  }, [programs]);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Manage Programs</h4>
            <p className={classes.cardCategoryWhite}>
              Below is a list of all the Programs
            </p>
          </CardHeader>
          <CardBody>
            <Link to='/admin/create-program' className='text-decoration-none'>
              <Button color='primary' variant='contained'>
                Add program
              </Button>
            </Link>
            {programsList.length > 0 ? (
              <Table
                tableHeaderColor='primary'
                tableHead={['S.No', 'Name', 'Department', 'Actions']}
                tableData={getPrograms()}
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

ManagePrograms.propTypes = {
  getAllPrograms: PropTypes.func.isRequired,
  program: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  program: state.program
});

export default connect(mapStateToProps, { getAllPrograms })(ManagePrograms);
