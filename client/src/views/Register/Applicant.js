import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import GridItem from '../../components/Grid/GridItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerApplicant } from '../../actions/auth';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';

const Applicant = ({
  registerApplicant,
  auth: { loading, isAuthenticated, user },
  setAlert
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    type: ''
  });

  const { name, email, password, type } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (type === '') {
      setAlert('Please fill in all the feilds in order to proceed.');
    } else {
      registerApplicant(formData);
    }
  };

  if (!loading && isAuthenticated && user !== null && user.type === 3) {
    return <Redirect to='/applicant' />;
  }

  return (
    <Fragment>
      <Container className='container-primary'>
        <Paper elevation={4} className='paper-primary'>
          <Grid container>
            <Grid
              xs={12}
              sm={12}
              md={12}
              item
              className='text-center-horizontal'
            >
              <Typography
                align='center'
                className='title-secondary'
                color='primary'
              >
                Applicant Registeration
              </Typography>
              <div className='description-secondary text-center'>
                Please fill in the form
              </div>
            </Grid>
            <Grid xs={12} sm={12} md={12} item>
              <form className='form' onSubmit={e => onSubmit(e)}>
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
                <TextField
                  className='form-control'
                  label='Email'
                  variant='outlined'
                  type='email'
                  name='email'
                  value={email}
                  onChange={e => onChange(e)}
                  required={true}
                />
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
                <FormControl variant='outlined' className='form-control'>
                  <InputLabel id='program-label'>
                    Program applying for
                  </InputLabel>
                  <Select
                    labelId='program-label'
                    label='Program applying for'
                    name='type'
                    value={type}
                    onChange={e => onChange(e)}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={0}>Undergraduate</MenuItem>
                    <MenuItem value={1}>Graduate</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant='contained'
                  color='primary'
                  size='large'
                  type='submit'
                  className='form-control'
                >
                  Register
                </Button>
                <GridItem style={{ textAlign: 'center' }}>
                  If you already have an account?{' '}
                  <Link to to={'/login/applicant'}>
                    Login
                  </Link>
                </GridItem>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Fragment>
  );
};

Applicant.propTypes = {
  registerApplicant: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { registerApplicant, setAlert })(
  Applicant
);
