import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatePassword } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import { makeStyles } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core';

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
  },
  root: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

const useStyles = makeStyles(styles);

const Password = ({ updatePassword, setAlert }) => {
  const classes = useStyles(styles);

  const [formData, setFormData] = useState({
    password: '',
    cpassword: ''
  });

  const { password, cpassword } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (password !== cpassword) {
      setAlert('Passwords do not match', 'danger');
    } else {
      updatePassword(password);
    }
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Password</h4>
            <p className={classes.cardCategoryWhite}>Update your password</p>
          </CardHeader>
          <CardBody>
            <form onSubmit={e => onSubmit(e)}>
              <GridContainer>
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
                <GridItem xs={12} sm={12} md={4}>
                  <Button color='primary' variant='contained' type='submit'>
                    Update Password
                  </Button>
                </GridItem>
              </GridContainer>
            </form>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

Password.propTypes = {
  updatePassword: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default connect(null, { updatePassword, setAlert })(Password);
