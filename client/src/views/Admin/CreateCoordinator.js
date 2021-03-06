import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getAllDepartments } from '../../actions/department';
import { registerCoordinator } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import { Redirect, withRouter, Link } from 'react-router-dom';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
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

const CreateCoordinator = ({
  history,
  department: { departments },
  getAllDepartments,
  auth: { loading, isAuthenticated, user },
  setAlert,
  registerCoordinator
}) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
    department: '',
    description: ''
  });

  const {
    name,
    email,
    password,
    cpassword,
    department,
    description
  } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (
      name === '' ||
      email === '' ||
      password === '' ||
      cpassword === '' ||
      department === '' ||
      description === ''
    ) {
      setAlert('Please fill in all the feilds in order to proceed.');
    } else {
      registerCoordinator(formData, history);
    }
  };

  const [getAllDepartmentsCalled, setGetAllDepartmentsCalled] = useState(false);

  useEffect(() => {
    if (!getAllDepartmentsCalled) {
      getAllDepartments();
      setGetAllDepartmentsCalled(true);
    }
  }, []);

  if (!loading && isAuthenticated && user !== null && user.type === 1) {
    return <Redirect to='/manage-coordinator' />;
  }

  return (
    <GridContainer>
      <GridItem>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Create Coordinator</h4>
            <p className={classes.cardCategoryWhite}>
              Fill in the information below to register the coordinator
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={e => onSubmit(e)}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Name'
                    variant='outlined'
                    type='text'
                    name='name'
                    value={name}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Email'
                    variant='outlined'
                    type='text'
                    name='email'
                    value={email}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Password'
                    variant='outlined'
                    type='password'
                    name='password'
                    value={password}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Confirm Password'
                    variant='outlined'
                    type='password'
                    name='cpassword'
                    value={cpassword}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Description'
                    variant='outlined'
                    type='text'
                    name='description'
                    value={description}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl variant='outlined' className='form-control'>
                    <InputLabel id='department-label'>Department</InputLabel>
                    <Select
                      labelId='department-label'
                      label='Department'
                      name='department'
                      value={department}
                      onChange={e => onChange(e)}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {!loading &&
                        departments.length > 0 &&
                        departments.map(department => (
                          <MenuItem value={`${department._id}`}>
                            {department.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Button
                    color='secondary'
                    variant='contained'
                    type='submit'
                    size='large'
                  >
                    Submit
                  </Button>
                  &nbsp;
                  <Link
                    to={'/admin/manage-coordinators'}
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
              </GridContainer>
            </form>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

CreateCoordinator.propTypes = {
  getAllDepartments: PropTypes.func.isRequired,
  registerCoordinator: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  department: state.department,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getAllDepartments,
  registerCoordinator,
  setAlert
})(withRouter(CreateCoordinator));
