import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { loadUser } from '../../actions/auth';
import { updateAdminExperienceDetails } from '../../actions/profile';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import StatusStepper from './StatusStepper';
import { TextField, Button, Checkbox } from '@material-ui/core';

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

const ExperienceDetails = ({
  updateAdminExperienceDetails,
  history,
  loadUser,
  profile: { loading, profile }
}) => {
  const classes = useStyles();

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

  const getToDate = toDate => {
    let d = new Date(toDate);

    const date = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getYear();

    return `${year}-${month < 10 ? '0' : ''}${month}-${
      date < 10 ? '0' : ''
    }${date}`;
  };

  const getFromDate = fromDate => {
    let d = new Date(fromDate);

    const date = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getYear();

    return `${year}-${month < 10 ? '0' : ''}${month}-${
      date < 10 ? '0' : ''
    }${date}`;
  };

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const { title, company, location, from, to, current, description } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    updateAdminExperienceDetails(formData, history);
  };

  const [getCurrentUserCalled, setGetCurrentUserCalled] = useState(false);

  useEffect(() => {
    if (!getCurrentUserCalled) {
      loadUser();
      setGetCurrentUserCalled(true);
    }

    setFormData({
      title:
        !loading && profile !== null && profile.experienceDetails
          ? profile.experienceDetails.title
          : '',
      company:
        !loading && profile !== null && profile.experienceDetails
          ? profile.experienceDetails.company
          : '',
      location:
        !loading && profile !== null && profile.experienceDetails
          ? profile.experienceDetails.location
          : '',
      from:
        !loading && profile !== null && profile.experienceDetails
          ? getFromDate(profile.experienceDetails.from)
          : getCurrentDate(),
      to:
        !loading && profile !== null && profile.experienceDetails
          ? getToDate(profile.experienceDetails.to)
          : getCurrentDate(),
      current:
        !loading && profile !== null && profile.experienceDetails
          ? profile.experienceDetails.current
          : '',
      description:
        !loading && profile !== null && profile.experienceDetails
          ? profile.experienceDetails.description
          : ''
    });
  }, [profile]);

  if (!loading && profile !== null && profile.status < 1) {
    return <Redirect to='/admin/create-profile' />;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader className='primary'>
            <h1 className={classes.cardTitleWhite}>Experience Details</h1>
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
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Title'
                    variant='outlined'
                    name='title'
                    type='text'
                    value={title}
                    required={true}
                    onChange={e => onChange(e)}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Company'
                    variant='outlined'
                    name='company'
                    type='text'
                    value={company}
                    required={true}
                    onChange={e => onChange(e)}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    className='form-control'
                    label='Location'
                    variant='outlined'
                    name='location'
                    type='text'
                    value={location}
                    required={true}
                    onChange={e => onChange(e)}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='From'
                    variant='outlined'
                    name='from'
                    type='date'
                    value={from}
                    required={true}
                    onChange={e => onChange(e)}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='To'
                    variant='outlined'
                    name='to'
                    type='date'
                    value={to}
                    onChange={e => onChange(e)}
                    disabled={current}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
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
                    label='Give a brief description about your experience with the company mentioned above.'
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

ExperienceDetails.propTypes = {
  loadUser: PropTypes.func.isRequired,
  updateAdminExperienceDetails: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {
  loadUser,
  updateAdminExperienceDetails
})(withRouter(ExperienceDetails));
