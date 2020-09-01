import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from '../../components/Table/Table.js';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { getAllUndergraduatePrograms } from '../../actions/program';
import { getAllGraduatePrograms } from '../../actions/program';
import { Link } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

const ProgramTabs = ({
  getAllUndergraduatePrograms,
  getAllGraduatePrograms,
  program: { loading, undergraduatePrograms, graduatePrograms }
}) => {
  const classes = useStyles();

  const [undergraduateProgramsList, setUndergraduateProgramsList] = useState(
    []
  );

  const getUndergraduatePrograms = () => {
    let res = [];
    let i = 1;

    undergraduateProgramsList.forEach(program => {
      res = [
        ...res,
        [
          `${i}`,
          program.name,
          program.department.name,
          program.description,
          program.duration.yearly,
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
                Update
              </Button>
            </Link>
            <Button
              variant='contained'
              className='margin-left-right margin-top-bottom button-function'
            >
              Enable
            </Button>
            <Button
              variant='contained'
              className='margin-left-right margin-top-bottom button-danger'
            >
              Remove
            </Button>
          </Fragment>
        ]
      ];

      i++;
    });

    return res;
  };

  const [graduateProgramsList, setGraduateProgramsList] = useState([]);

  const getGraduatePrograms = () => {
    let res = [];
    let i = 1;

    graduateProgramsList.forEach(program => {
      res = [
        ...res,
        [
          `${i}`,
          program.name,
          program.department.name,
          program.description,
          program.duration.yearly,
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
                Update
              </Button>
            </Link>
            <Button
              variant='contained'
              className='margin-left-right margin-top-bottom button-function'
            >
              Enable
            </Button>
            <Button
              variant='contained'
              className='margin-left-right margin-top-bottom button-danger'
            >
              Remove
            </Button>
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
      !loading && graduatePrograms.length > 0 ? graduatePrograms : []
    );
  }, [graduatePrograms]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'
          variant='fullWidth'
        >
          <Tab label='Undergraduate Programs' {...a11yProps(0)} />
          <Tab label='Graduate Programs' {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Link
          to='/admin/create-undergraduate-program'
          className='text-decoration-none'
        >
          <Button color='primary' variant='contained'>
            Add Undergraduate program
          </Button>
        </Link>
        {undergraduateProgramsList.length > 0 ? (
          <Table
            tableHeaderColor='primary'
            tableHead={[
              'S.No',
              'Name',
              'Department',
              'Description',
              'Duration (years)',
              'Actions'
            ]}
            tableData={getUndergraduatePrograms()}
          />
        ) : (
          <div className='text-center imp-message'>No programs found</div>
        )}
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Link
          to='/admin/create-graduate-program'
          className='text-decoration-none'
        >
          <Button color='primary' variant='contained'>
            Add Graduate program
          </Button>
          {console.log('error')}
        </Link>
        {graduateProgramsList.length > 0 ? (
          <Table
            tableHeaderColor='primary'
            tableHead={[
              'S.No',
              'Name',
              'Department',
              'Description',
              'Duration (years)',
              'Actions'
            ]}
            tableData={getGraduatePrograms()}
          />
        ) : (
          <div className='text-center imp-message'>No programs found</div>
        )}
      </TabPanel>
    </div>
  );
};

ProgramTabs.propTypes = {
  getAllUndergraduatePrograms: PropTypes.func.isRequired,
  getAllGraduatePrograms: PropTypes.func.isRequired,
  program: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  program: state.program
});

export default connect(mapStateToProps, {
  getAllUndergraduatePrograms,
  getAllGraduatePrograms
})(ProgramTabs);
