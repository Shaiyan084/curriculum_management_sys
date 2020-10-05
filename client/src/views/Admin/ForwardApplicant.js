import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  getApplicantById,
  testScoreAdded,
  calculateAggregate,
  applicationForwarded
} from '../../actions/applicant';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import Table from '../../components/Table/Table.js';
import Divider from '@material-ui/core/Divider';
import FormImage from '../Applicant/FormImage';
import ProfilePicture from '../Applicant/ProfilePicture';
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

const ForwardApplicant = ({
  getApplicantById,
  calculateAggregate,
  applicationForwarded,
  testScoreAdded,
  applicant: { loading, applicant },
  history,
  auth,
  match
}) => {
  const classes = useStyles(styles);

  const [getApplicantByIdCalled, setGetApplicantByIdCalled] = useState(false);

  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    fatherName: '',
    cnicNumber: '',
    cnicFrontPicture: '',
    cnicBackPicture: '',
    address: '',
    placeOfBirth: '',
    dateOfBirth: '',
    phoneNumber: '',
    domicile: ''
  });

  const [incomeDetails, setIncomeDetails] = useState({
    monthlyIncome: '',
    minimumYearlyIncome: ''
  });

  const [educationDetails, setEducationDetails] = useState({
    secondaryEducationType: '',
    secondaryEducationInstitute: '',
    secondaryEducationFieldOfStudy: '',
    secondaryEducationFrom: '',
    secondaryEducationTo: '',
    secondaryEducationObtainedMarks: '',
    secondaryEducationTotalMarks: '',
    secondaryEducationPicture: '',
    intermediateEducationType: '',
    intermediateEducationInstitute: '',
    intermediateEducationFieldOfStudy: '',
    intermediateEducationFrom: '',
    intermediateEducationTo: '',
    intermediateEducationObtainedMarks: '',
    intermediateEducationTotalMarks: '',
    intermediateEducationPicture: ''
    // bachelorEducationInstitute: '',
    // bachelorEducationFieldOfStudy: '',
    // bachelorEducationFrom: '',
    // bachelorEducationTo: '',
    // bachelorEducationPicture: '',
    // cgpa: ''
  });

  const [testScore, setTestScore] = useState(0);

  useEffect(() => {
    if (!getApplicantByIdCalled) {
      getApplicantById(match.params.id);
      setGetApplicantByIdCalled(true);
    }

    setTestScore(
      !loading &&
        applicant !== null &&
        applicant.educationDetails &&
        applicant.educationDetails.universityTestScore
        ? applicant.educationDetails.universityTestScore
        : 0
    );

    setPersonalDetails({
      name:
        !loading && applicant !== null && applicant.personalDetails
          ? applicant.personalDetails.name
          : '',
      fatherName:
        !loading && applicant !== null && applicant.personalDetails
          ? applicant.personalDetails.fatherName
          : '',
      cnicNumber:
        !loading && applicant !== null && applicant.personalDetails
          ? applicant.personalDetails.cnic.number
          : '',
      cnicFrontPicture:
        !loading && applicant !== null && applicant.personalDetails
          ? applicant.personalDetails.cnic.frontPicture
          : '',
      cnicBackPicture:
        !loading && applicant !== null && applicant.personalDetails
          ? applicant.personalDetails.cnic.backPicture
          : '',
      address:
        !loading && applicant !== null && applicant.personalDetails
          ? applicant.personalDetails.address
          : '',
      placeOfBirth:
        !loading && applicant !== null && applicant.personalDetails
          ? applicant.personalDetails.placeOfBirth
          : '',
      dateOfBirth:
        !loading && applicant !== null && applicant.personalDetails
          ? applicant.personalDetails.dateOfBirth
          : '',
      phoneNumber:
        !loading && applicant !== null && applicant.personalDetails
          ? applicant.personalDetails.phoneNumber
          : '',
      domicile:
        !loading && applicant !== null && applicant.personalDetails
          ? applicant.personalDetails.domicile
          : ''
    });

    setIncomeDetails({
      monthlyIncome:
        !loading && applicant !== null && applicant.incomeDetails
          ? applicant.incomeDetails.monthlyIncome
          : '',
      minimumYearlyIncome:
        !loading && applicant !== null && applicant.incomeDetails
          ? applicant.incomeDetails.minimumYearlyIncome
          : ''
    });

    setEducationDetails({
      secondaryEducationType:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.secondaryEducationDetails.type
          : '',
      secondaryEducationInstitute:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.secondaryEducationDetails.institute
          : '',
      secondaryEducationFieldOfStudy:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.secondaryEducationDetails.fieldOfStudy
          : '',
      secondaryEducationFrom:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.secondaryEducationDetails.from
          : '',
      secondaryEducationTo:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.secondaryEducationDetails.to
          : '',
      secondaryEducationObtainedMarks:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.secondaryEducationDetails.obtainedMarks
          : '',
      secondaryEducationTotalMarks:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.secondaryEducationDetails.totalMarks
          : '',
      secondaryEducationPicture:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.secondaryEducationDetails.picture
          : '',
      intermediateEducationType:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.intermediateEducationDetails.type
          : '',
      intermediateEducationInstitute:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.intermediateEducationDetails.institute
          : '',
      intermediateEducationFieldOfStudy:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.intermediateEducationDetails.fieldOfStudy
          : '',
      intermediateEducationFrom:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.intermediateEducationDetails.from
          : '',
      intermediateEducationTo:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.intermediateEducationDetails.to
          : '',
      intermediateEducationObtainedMarks:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.intermediateEducationDetails
              .obtainedMarks
          : '',
      intermediateEducationTotalMarks:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.intermediateEducationDetails.totalMarks
          : '',
      intermediateEducationPicture:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.intermediateEducationDetails.picture
          : ''
      // bachelorEducationInstitute:
      //   !loading && applicant !== null
      //     ? applicant.educationDetails.bachelorEducationDetails.institute
      //     : '',
      // bachelorEducationFieldOfStudy:
      //   !loading && applicant !== null
      //     ? applicant.educationDetails.bachelorEducationDetails.fieldOfStudy
      //     : '',
      // bachelorEducationFrom:
      //   !loading && applicant !== null
      //     ? applicant.educationDetails.bachelorEducationDetails.from
      //     : '',
      // bachelorEducationTo:
      //   !loading && applicant !== null
      //     ? applicant.educationDetails.bachelorEducationDetails.to
      //     : '',
      // bachelorEducationPicture:
      //   !loading && applicant !== null
      //     ? applicant.educationDetails.bachelorEducationDetails.picture
      //     : '',
      // cgpa:
      //   !loading && applicant !== null ? applicant.educationDetails.cgpa : ''
    });
  }, [applicant]);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardHeader color='info'>
                <h1 className={classes.cardTitleWhite}>Applicant Details</h1>
                <p className={classes.cardCategoryWhite}>Applicants Info</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    {/* <ProfilePicture
                      avatar={
                        !loading && applicant ? applicant.user.avatar : ''
                      }
                    /> */}
                    <div
                      style={{
                        textAlign: 'center',
                        marginBottom: '10px'
                      }}
                    >
                      <img
                        src={!loading && applicant ? applicant.user.avatar : ''}
                        alt=''
                        style={{
                          width: '100px',
                          height: '100px',
                          borderRadius: '50%'
                        }}
                      />
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <Box
                      component='div'
                      display='block'
                      p={1}
                      m={1}
                      bgcolor='grey'
                      fontWeight='fontWeightBold'
                      fontSize={16}
                    >
                      <h4 align='center' style={{ margin: '0' }}>
                        {personalDetails.name}
                      </h4>
                    </Box>
                    <Box
                      component='div'
                      display='block'
                      p={1}
                      m={1}
                      bgcolor='grey'
                      fontWeight='fontWeightBold'
                      fontSize={16}
                    >
                      <h4 align='center' style={{ margin: '0' }}>
                        {personalDetails.fatherName}
                      </h4>
                    </Box>
                    <Divider variant='middle' />
                    {applicant &&
                      applicant.educationDetails &&
                      applicant.educationDetails.totalAggregate}
                    <GridItem xs={12} sm={12} md={12}>
                      <Button
                        variant='contained'
                        className='margin-left-right margin-top-bottom button-function'
                        onClick={() => calculateAggregate(applicant._id)}
                      >
                        Calculate Aggregate
                      </Button>
                    </GridItem>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color='info'>
                <h1 className={classes.cardTitleWhite}>Education Details</h1>
                <p className={classes.cardCategoryWhite}>
                  Applicants Education Details
                </p>
              </CardHeader>
              <CardBody>
                <h3 fontWeight='bold'>Secondary Education Details</h3>
                <GridContainer align='center'>
                  <GridItem xs={12} sm={12} md={4}>
                    <Box
                      component='div'
                      display='inline'
                      p={1}
                      m={1}
                      bgcolor='grey'
                      fontWeight='fontWeightBold'
                      fontSize={16}
                    >
                      <h4>
                        Type:
                        {educationDetails.secondaryEducationType}
                      </h4>
                    </Box>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Box
                      component='div'
                      display='inline'
                      p={1}
                      m={1}
                      bgcolor='grey'
                      fontWeight='fontWeightBold'
                      fontSize={16}
                    >
                      <h4>
                        Institute:
                        {educationDetails.secondaryEducationInstitute}
                      </h4>
                    </Box>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Box
                      component='div'
                      display='inline'
                      p={1}
                      m={1}
                      bgcolor='grey'
                      fontWeight='fontWeightBold'
                      fontSize={16}
                    >
                      <h4>
                        Field of Study:
                        {educationDetails.secondaryEducationFieldOfStudy}
                      </h4>
                    </Box>
                  </GridItem>
                </GridContainer>
                <Divider variant='middle' />
                <GridContainer align='center'>
                  <GridItem xs={12} sm={12} md={6}>
                    <Box
                      component='div'
                      display='inline'
                      p={1}
                      m={1}
                      bgcolor='grey'
                      fontWeight='fontWeightBold'
                      fontSize={16}
                    >
                      <h4>
                        From:
                        {educationDetails.secondaryEducationFrom}
                      </h4>
                    </Box>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <Box
                      component='div'
                      display='inline'
                      p={1}
                      m={1}
                      bgcolor='grey'
                      fontWeight='fontWeightBold'
                      fontSize={16}
                    >
                      <h4>
                        To:
                        {educationDetails.secondaryEducationTo}
                      </h4>
                    </Box>
                  </GridItem>
                </GridContainer>
                <Divider variant='middle' />
                <GridContainer align='center'>
                  <GridItem xs={12} sm={12} md={6}>
                    <Box
                      component='div'
                      display='inline'
                      p={1}
                      m={1}
                      bgcolor='grey'
                      fontWeight='fontWeightBold'
                      fontSize={16}
                    >
                      <h4>
                        Obtained Marks:
                        {educationDetails.secondaryEducationObtainedMarks}
                      </h4>
                    </Box>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <Box
                      component='div'
                      display='inline'
                      p={1}
                      m={1}
                      bgcolor='grey'
                      fontWeight='fontWeightBold'
                      fontSize={16}
                    >
                      <h4>
                        Total Marks:
                        {educationDetails.secondaryEducationTotalMarks}
                      </h4>
                    </Box>
                  </GridItem>
                </GridContainer>
                <Divider variant='middle' />
                <GridContainer align='center'>
                  <GridItem xs={12} sm={12} md={12}>
                    <Box
                      component='div'
                      display='inline'
                      p={1}
                      m={1}
                      fontWeight='fontWeightBold'
                      fontSize={16}
                    >
                      <h4>Certificate Picture</h4>
                      <FormImage
                        picture={educationDetails.secondaryEducationPicture}
                        title='Secondary Education Certificate Picture'
                      />
                    </Box>
                  </GridItem>
                </GridContainer>
                <Divider variant='middle' />
                <h3>Intermediate Education Details</h3>
                <GridContainer align='center'>
                  <GridItem xs={12} sm={12} md={4}>
                    <Box
                      component='div'
                      display='inline'
                      p={1}
                      m={1}
                      bgcolor='grey'
                      fontWeight='fontWeightBold'
                      fontSize={16}
                    >
                      <h4>
                        Type:
                        {educationDetails.intermediateEducationType}
                      </h4>
                    </Box>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Box
                      component='div'
                      display='inline'
                      p={1}
                      m={1}
                      bgcolor='grey'
                      fontWeight='fontWeightBold'
                      fontSize={16}
                    >
                      <h4>
                        Institute:
                        {educationDetails.intermediateEducationInstitute}
                      </h4>
                    </Box>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Box
                      component='div'
                      display='inline'
                      p={1}
                      m={1}
                      bgcolor='grey'
                      fontWeight='fontWeightBold'
                      fontSize={16}
                    >
                      <h4>
                        Field of Study:
                        {educationDetails.intermediateEducationFieldOfStudy}
                      </h4>
                    </Box>
                  </GridItem>
                </GridContainer>
                <Divider variant='middle' />
                <GridContainer align='center'>
                  <GridItem xs={12} sm={12} md={6}>
                    <Box
                      component='div'
                      display='inline'
                      p={1}
                      m={1}
                      bgcolor='grey'
                      fontWeight='fontWeightBold'
                      fontSize={16}
                    >
                      <h4>
                        From:
                        {educationDetails.intermediateEducationFrom}
                      </h4>
                    </Box>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <Box
                      component='div'
                      display='inline'
                      p={1}
                      m={1}
                      bgcolor='grey'
                      fontWeight='fontWeightBold'
                      fontSize={16}
                    >
                      <h4>
                        To:
                        {educationDetails.intermediateEducationTo}
                      </h4>
                    </Box>
                  </GridItem>
                </GridContainer>
                <Divider variant='middle' />
                <GridContainer align='center'>
                  <GridItem xs={12} sm={12} md={6}>
                    <Box
                      component='div'
                      display='inline'
                      p={1}
                      m={1}
                      bgcolor='grey'
                      fontWeight='fontWeightBold'
                      fontSize={16}
                    >
                      <h4>
                        Obtained Marks:
                        {educationDetails.intermediateEducationObtainedMarks}
                      </h4>
                    </Box>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <Box
                      component='div'
                      display='inline'
                      p={1}
                      m={1}
                      bgcolor='grey'
                      fontWeight='fontWeightBold'
                      fontSize={16}
                    >
                      <h4>
                        Total Marks:
                        {educationDetails.intermediateEducationTotalMarks}
                      </h4>
                    </Box>
                  </GridItem>
                </GridContainer>
                <Divider variant='middle' />
                <GridContainer align='center'>
                  <GridItem xs={12} sm={12} md={12}>
                    <Box
                      component='div'
                      display='inline'
                      p={1}
                      m={1}
                      fontWeight='fontWeightBold'
                      fontSize={16}
                    >
                      <h4>Certificate Picture</h4>
                      <FormImage
                        picture={educationDetails.intermediateEducationPicture}
                        title='Intermediate Education Certificate Picture'
                      />
                    </Box>
                  </GridItem>

                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      testScoreAdded(applicant._id, testScore);
                    }}
                  >
                    <GridItem xs={12} sm={12} md={12}>
                      <TextField
                        className='form-control'
                        label='Test Score'
                        variant='outlined'
                        type='number'
                        value={testScore}
                        onChange={e => setTestScore(e.target.value)}
                        required={true}
                      />
                    </GridItem>
                    &nbsp;
                    <GridItem xs={12} sm={12} md={12}>
                      <Button
                        variant='contained'
                        className='margin-left-right margin-top-bottom button-function'
                        // onClick={() => testScoreAdded(applicant._id)}
                        type='submit'
                      >
                        Add Test Score
                      </Button>
                      {/* </GridItem>
                    <GridItem xs={12} sm={12} md={3}> */}
                      <Button
                        variant='contained'
                        className='margin-left-right margin-top-bottom button-function color-primary'
                        onClick={() => applicationForwarded(applicant._id)}
                      >
                        Forward Application
                      </Button>
                    </GridItem>
                  </form>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
};

ForwardApplicant.propTypes = {
  getApplicantById: PropTypes.func.isRequired,
  calculateAggregate: PropTypes.func.isRequired,
  applicationForwarded: PropTypes.func.isRequired,
  testScoreAdded: PropTypes.func.isRequired,
  applicant: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  applicant: state.applicant,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getApplicantById,
  applicationForwarded,
  calculateAggregate,
  testScoreAdded
})(withRouter(ForwardApplicant));
