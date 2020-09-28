import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  getCurrentApplicant,
  updateGraduatePersonalDetails
} from '../../actions/applicant';

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

const GraduatePersonalDetail = ({
  getCurrentApplicant,
  updateGraduatePersonalDetails,
  applicant: { loading, applicant },
  history
}) => {
  const classes = useStyles(styles);

  return <div></div>;
};

GraduatePersonalDetail.propTypes = {
  getCurrentApplicant: PropTypes.func.isRequired,
  updateGraduatePersonalDetails: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  applicant: state.applicant
});

export default connect(mapStateToProps, {
  getCurrentApplicant,
  updateGraduatePersonalDetails
})(withRouter(GraduatePersonalDetail));
