import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { loadUser } from '../../actions/auth';
import {
  updateAdmissionSession,
  getAdmissionSessionsById
} from '../../actions/admission';
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
  }
};

const useStyles = makeStyles(styles);

const UpdateAdmissionSession = ({
  loadUser,
  updateAdmissionSession,
  getAdmissionSessionsById,
  admission: { loading: admissionSessionsLoading, session, sessions },
  auth: { loading, isAuthenticated, user },
  history,
  match
}) => {
  const classes = useStyles(styles);

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
    name: '',
    startDate: '',
    endDate: ''
  });

  const { name, startDate, endDate } = formData;

  const [getSessionById, setGetSessionById] = useState(false);

  useEffect(() => {
    if (!getSessionById) {
      getAdmissionSessionsById(match.params.id);
      setGetSessionById(true);
    }

    setFormData({
      name: !admissionSessionsLoading && session !== null ? session.name : '',
      startDate:
        !admissionSessionsLoading && session !== null
          ? getFormattedDate(session.startDate)
          : getCurrentDate(),
      endDate:
        !admissionSessionsLoading && session !== null
          ? getFormattedDate(session.endDate)
          : getCurrentDate()
    });
  }, [session]);

  const [getCurrentUserCalled, setGetCurrentUserCalled] = useState(false);

  useEffect(() => {
    if (!getCurrentUserCalled) {
      loadUser();
      setGetCurrentUserCalled(true);
    }
  }, [user, sessions]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    updateAdmissionSession(match.params.id, formData, history);
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Admission Session</h4>
            <p className={classes.cardCategoryWhite}>
              Create an admission session for the applicants to apply
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={e => onSubmit(e)}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    className='form-control'
                    label='Session Name'
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
                    label='StartDate'
                    variant='outlined'
                    type='date'
                    name='startDate'
                    value={startDate}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='End Date'
                    variant='outlined'
                    type='date'
                    name='endDate'
                    value={endDate}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Button color='secondary' variant='contained' type='submit'>
                    Update
                  </Button>
                  &nbsp;
                  {/* </GridItem>
                <GridItem xs={12} sm={12} md={12}> */}
                  <Link to={'/admin/dashboard'}>
                    <Button color='primary' variant='contained'>
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

UpdateAdmissionSession.propTypes = {
  loadUser: PropTypes.func.isRequired,
  getAdmissionSessionsById: PropTypes.func.isRequired,
  updateAdmissionSession: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  admission: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admission: state.admission,
  auth: state.auth
});

export default connect(mapStateToProps, {
  loadUser,
  updateAdmissionSession,
  getAdmissionSessionsById
})(withRouter(UpdateAdmissionSession));
