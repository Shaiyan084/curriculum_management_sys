import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadUser } from '../../actions/auth';
import { updateAdminPersonalDetails } from '../../actions/profile';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import StatusStepper from './StatusStepper';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button
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

const PersonalDetails = ({
  loadUser,
  updateAdminPersonalDetails,
  history,
  profile: { profile, loading },
  auth
}) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    // address: '',
    dateOfBirth: '',
    description: '',
    cnic: '',
    type: ''
  });

  const {
    name,
    email,
    //   address,
    dateOfBirth,
    description,
    cnic,
    type
  } = formData;

  const getCurrentDate = () => {
    let d = new Date(Date.now());
    d = new Date(Date.now() + d.getTimezoneOffset() * 60000);

    const date = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getYear();

    return `${year}-${month < 10 ? '0' : ''}${month}-${
      date < 10 ? '0' : ''
    }${date}`;
  };

  const getFormattedDate = dateToFormat => {
    let d = new Date(dateToFormat);

    const date = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getYear();

    return `${year}-${month < 10 ? '0' : ''}${month}-${
      date < 10 ? '0' : ''
    }${date}`;
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    updateAdminPersonalDetails(formData, history);
  };

  const [getCurrentUserCalled, setGetCurrentUserCalled] = useState(false);

  useEffect(() => {
    if (!getCurrentUserCalled) {
      loadUser();
      setGetCurrentUserCalled(true);
    }

    setFormData({
      name:
        !loading && profile !== null && profile.myDetails
          ? profile.myDetails.name
          : '',
      email:
        !loading && profile !== null && profile.myDetails
          ? profile.myDetails.email
          : '',
      //   address:
      //     !loading && profile !== null && profile.myDetails
      //       ? profile.myDetails.address
      //       : '',
      dateOfBirth:
        !loading && profile !== null && profile.myDetails
          ? getFormattedDate(profile.myDetails.dateOfBirth)
          : getCurrentDate(),
      description:
        !loading && profile !== null && profile.myDetails
          ? profile.myDetails.description
          : '',
      cnic:
        !loading && profile !== null && profile.myDetails
          ? profile.myDetails.cnic
          : '',
      type:
        !loading && profile !== null && profile.myDetails
          ? profile.myDetails.type
          : ''
    });
  }, [profile]);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h1 className={classes.cardTitleWhite}>Personal Details</h1>
            <p className={classes.cardCategoryWhite}>
              Fill in the information below update your personal details
            </p>
          </CardHeader>
          <CardBody>
            <StatusStepper
              status={!loading && profile !== null ? profile.status : 0}
            />
            <form onSubmit={e => onSubmit(e)}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    className='form-control'
                    label='Name'
                    variant='outlined'
                    name='name'
                    type='text'
                    value={name}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
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
                    label='Date of Birth'
                    variant='outlined'
                    type='date'
                    name='dateOfBirth'
                    value={dateOfBirth}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl className='form-control' variant='outlined'>
                    <InputLabel id='type-label'>Status</InputLabel>
                    <Select
                      labelId='type-label'
                      label='Status'
                      name='type'
                      value={type}
                      onChange={e => onChange(e)}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={0}>Admin</MenuItem>
                      <MenuItem value={1}>Admin/Faculty</MenuItem>
                      <MenuItem value={2}>Faculty</MenuItem>
                      <MenuItem value={3}>Faculty/Coordinator</MenuItem>
                      <MenuItem value={4}>Coordintor</MenuItem>
                      <MenuItem value={5}>Coordinator/Admin</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    className='form-control'
                    label='CNIC (Please enter a 13 digit CNIC number: xxxxx-xxxxxxx-x)'
                    variant='outlined'
                    type='number'
                    name='cnic'
                    value={cnic}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    className='form-control'
                    label='Personal Info (Note this info will be shown on your profile)'
                    rows={5}
                    multiline
                    type='text'
                    variant='outlined'
                    name='description'
                    value={description}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Button
                    color='primary'
                    variant='contained'
                    type='submit'
                    size='large'
                  >
                    Submit
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

PersonalDetails.propTypes = {
  loadUser: PropTypes.func.isRequired,
  updateAdminPersonalDetails: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {
  loadUser,
  updateAdminPersonalDetails
})(withRouter(PersonalDetails));
