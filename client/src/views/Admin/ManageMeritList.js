import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MeritList from './MeritList';
import { getCurrentSession } from '../../actions/admission';
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
  Checkbox,
} from '@material-ui/core';

const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '0.9rem',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardCategoryBlack: {
    '&,& a, & a:hover, & a:focus': {
      color: 'rgba(0,0,0)',
      margin: '0',
      fontSize: '0.9rem',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#000000',
    },
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
      lineHeight: '1',
    },
  },
};

const useStyles = makeStyles(styles);

const ManageMeritList = ({
  admission: { session, loading: admissionSessionLoading },
  getCurrentSession,
}) => {
  const classes = useStyles(styles);

  const getMeritData = () => {
    let result = [];
    session.meritList.map(item => {
      const name = item.applicantId.personalDetails.name;
      const email = item.applicantId.personalDetails.email;
      const totalAggregate = item.applicantId.educationDetails.totalAggregate;
      result = [
        ...result,
        {
          name,
          email,
          totalAggregate,
          //   actions: 'Actions',
        },
      ];
    });
    return result;
  };

  const [getCurrentAdmissionSesssion, setGetCurrentAdmissionSession] = useState(
    false
  );

  useEffect(() => {
    if (!getCurrentAdmissionSesssion) {
      getCurrentSession();
      setGetCurrentAdmissionSession(true);
    }
  }, []);

  return (
    <MeritList
      rows={
        session !== null && session.meritList.length > 0 ? getMeritData() : []
      }
    />
  );
};

ManageMeritList.propTypes = {
  getCurrentSession: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  admission: state.admission,
});

export default connect(mapStateToProps, { getCurrentSession })(
  withRouter(ManageMeritList)
);
