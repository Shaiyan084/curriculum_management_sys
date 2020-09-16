import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { loadUser } from '../../actions/auth';
import { updateAdminEducationDetails } from '../../actions/profile';
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import StatusStepper from './StatusStepper';
import { TextField, Button, Checkbox } from '@material-ui/core';

const styles = {
  cardTitleWhite: {
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
  cardCategoryWhite: {
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

const EducationDetails = ({
  loadUser,
  updateAdminEducationDetails,
  profile: { loading, profile },
  history
}) => {
  const classes = useStyles();

  const getCurrentDate = () => {
    let d = new Date(Date.now());
    d = new Date(Date.now() + d.getTimezoneOffset() * 60000);

    const date = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    return `${year}-${month < 10 ? '0' : ''}${month}-${
      date < 10 ? '0' : ''
    }${date}`;
  };

  const getFormattedDate = dateToFormat => {
    let d = new Date(dateToFormat);

    const date = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    return `${year}-${month < 10 ? '0' : ''}${month}-${
      date < 10 ? '0' : ''
    }${date}`;
  };

  const [formData, setFormData] = useState({
    college: '',
    university: '',
    degree: '',
    fieldOfStudy: '',
    from: '',
    to: '',
    current: '',
    description: ''
  });

  const {
    college,
    university,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description
  } = formData;

  const [getCurrentUserCalled, setGetCurrentUserCalled] = useState(false);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    updateAdminEducationDetails(formData, history);
  };

  useEffect(() => {
    if (!getCurrentUserCalled) {
      loadUser();
      setGetCurrentUserCalled(true);
    }

    setFormData({
      college:
        !loading && profile !== null && profile.educationDetails
          ? profile.educationDetails.college
          : '',
      university:
        !loading && profile !== null && profile.educationDetails
          ? profile.educationDetails.university
          : '',
      degree:
        !loading && profile !== null && profile.educationDetails
          ? profile.educationDetails.degree
          : '',
      fieldOfStudy:
        !loading && profile !== null && profile.educationDetails
          ? profile.educationDetails.fieldOfStudy
          : '',
      from:
        !loading && profile !== null && profile.educationDetails
          ? getFormattedDate(profile.educationDetails.from)
          : getCurrentDate(),
      to:
        !loading && profile !== null && profile.educationDetails
          ? getFormattedDate(profile.educationDetails.to)
          : getCurrentDate(),
      current:
        !loading && profile !== null && profile.educationDetails
          ? profile.educationDetails.current
          : '',
      description:
        !loading && profile !== null && profile.educationDetails
          ? profile.educationDetails.description
          : ''
    });
  }, [profile]);

  if (!loading && profile !== null && profile.status < 2) {
    return <Redirect to='/admin/education-details' />;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader>
            <h1 className={classes.cardTitleWhite}>Education Details</h1>
            <p className={classes.cardCategoryWhite}>
              Fill in the information below update your education details
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
                    label='College'
                    variant='outlined'
                    name='college'
                    type='text'
                    value={college}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    className='form-control'
                    label='University'
                    variant='outlined'
                    name='university'
                    type='text'
                    value={university}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    className='form-control'
                    label='Degree'
                    variant='outlined'
                    name='degree'
                    type='text'
                    value={degree}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    className='form-control'
                    label='Field of Study'
                    variant='outlined'
                    name='fieldOfStudy'
                    type='text'
                    value={fieldOfStudy}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    className='form-control'
                    label='From'
                    variant='outlined'
                    name='from'
                    type='date'
                    value={from}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    className='form-control'
                    label='To'
                    variant='outlined'
                    name='to'
                    type='date'
                    value={to}
                    required={true}
                    onChange={e => onChange(e)}
                    disabled={current}
                  />
                </GridItem>
                <GridItem>
                  <Checkbox
                    className='form-control'
                    checked={current}
                    onChange={e => {
                      setFormData({ ...formData, current: !current });
                    }}
                  />
                </GridItem>
                &nbsp;
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    className='form-control'
                    label='Give a brief description about your major in last education (let it be your university).'
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

EducationDetails.propTypes = {
  loadUser: PropTypes.func.isRequired,
  updateAdminEducationDetails: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {
  loadUser,
  updateAdminEducationDetails
})(withRouter(EducationDetails));
