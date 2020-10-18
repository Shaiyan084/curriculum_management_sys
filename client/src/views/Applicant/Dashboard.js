import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { getCurrentApplicant, checkMeritStatus } from '../../actions/applicant';
import { makeStyles } from '@material-ui/core';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import Divider from '@material-ui/core/Divider';
import FormImage from './FormImage';
import Moment from 'react-moment';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import {
  // FormControl,
  // InputLabel,
  // Select,
  // MenuItem,
  // TextField,
  Button,
  Box,
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

const Dashboard = ({
  getCurrentApplicant,
  checkMeritStatus,
  applicant: { applicant, loading },
  program: { loading: programLoading, program },
  auth,
}) => {
  const classes = useStyles(styles);

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
    domicile: '',
  });

  const [incomeDetails, setIncomeDetails] = useState({
    monthlyIncome: '',
    minimumYearlyIncome: '',
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
    intermediateEducationPicture: '',
  });

  const [getCurrentApplicantCalled, setGetCurrentApplicantCalled] = useState(
    false
  );

  useEffect(() => {
    if (!getCurrentApplicantCalled) {
      getCurrentApplicant();
      setGetCurrentApplicantCalled(true);
    }

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
          : '',
    });

    setIncomeDetails({
      monthlyIncome:
        !loading && applicant !== null && applicant.incomeDetails
          ? applicant.incomeDetails.monthlyIncome
          : '',
      minimumYearlyIncome:
        !loading && applicant !== null && applicant.incomeDetails
          ? applicant.incomeDetails.minimumYearlyIncome
          : '',
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
          : '',
      totalAggregate:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.totalAggregate
          : '',
    });
  }, [applicant]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getCurrentApplicant();
  }, []);

  const [isOnMerit, setIsOnMerit] = useState(false);

  useEffect(() => {
    checkMeritStatus().then(result => {
      setIsOnMerit(result);
    });
  }, []);

  return (
    <GridContainer>
      <GridItem xs={12} md={12} sm={12}>
        <Card>
          <CardHeader color='primary'>
            <h1 className={classes.cardTitleWhite}>Notifications</h1>
            <p className={classes.cardCategoryWhite}>
              Latest announcements and updates by admin will be posted here.
            </p>
          </CardHeader>
          &nbsp;
          <CardBody>
            <GridContainer>
              <GridItem>
                {
                  !loading &&
                    applicant !== null &&
                    applicant.educationDetails &&
                    applicant.educationDetails.totalAggregate &&
                    applicant.appliedPrograms.map(programme => {
                      if (
                        applicant.educationDetails.totalAggregate >=
                        programme.programme.criteria.minPercentageOfEquivalence
                      ) {
                        return (
                          <div>{`Congratulations! You are on the Merit List of ${programme.programme.name}`}</div>
                        );
                      } else {
                        return (
                          <div>{`You do not fit the criteria for ${programme.programme.name}`}</div>
                        );
                      }
                    })
                  // applicant.educationDetails.totalAggregate >=
                  //   program.criteria.minimumPercentageOfEquivalence &&
                  // applicant.applicantForwarded ? (
                  //   isOnMerit && (
                  //     <div>Congratulations! You are on the Merit List.</div>
                  //   )
                  // ) : (
                  //   <div>
                  //     You are not on the merit list, check the next merit list for
                  //     further details. If still your name is not on the merit list
                  //     refer to the respective Admin or Coordinator.
                  //   </div>
                }
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
        <Divider variant='middle' />
        &nbsp;
        <Card>
          <CardHeader color='primary'>
            <h1 className={classes.cardTitleWhite}>Apply For</h1>
            <p className={classes.cardCategoryWhite}>
              Here you can choose to apply for undergraduate or graduate program
            </p>
          </CardHeader>
          &nbsp;
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <GridItem>
                  <p className={classes.cardCategoryBlack}>
                    Undergraduate Programs are basically constituting of the
                    major part of your degree. These programs are necessary for
                    the completion of your Bachelors Degree Plan and the
                    resultant score can be used to apply for the Graduate
                    Program. Scoring a good result will help you proceed your
                    carreer further into the Masters Degree Plan.
                  </p>
                </GridItem>
                &nbsp;
                <GridItem>
                  <Link
                    to={
                      applicant && applicant.applicantForwarded
                        ? '#'
                        : '/applicant/undergraduate-program-selection-list'
                    }
                    className='text-decoration-none'
                  >
                    <Button
                      color='primary'
                      variant='contained'
                      type='submit'
                      size='large'
                      disabled={applicant && applicant.applicantForwarded}
                    >
                      Apply For Undergraduate Program
                    </Button>
                  </Link>
                </GridItem>
              </GridItem>
              {/* <Divider orientation="vertical" flexItem /> */}
              <GridItem xs={12} sm={12} md={6}>
                <GridItem>
                  <p className={classes.cardCategoryBlack}>
                    Graduate Programs constitute of the major part of your
                    Masters Degree. These programs are necessary for the
                    completion of your Masters Degree Plan and the resultant
                    score can be used to apply for the PhD. Programs later on.
                    Scoring a good result will help you proceed your carreer
                    further into the PhD. if you desire to.
                  </p>
                </GridItem>
                &nbsp;
                <GridItem>
                  <Link
                    className='text-decoration-none'
                    to={
                      applicant && applicant.applicantForwarded
                        ? '#'
                        : '/applicant/graduate-program-selection-list'
                    }
                  >
                    <Button
                      color='primary'
                      variant='contained'
                      type='submit'
                      size='large'
                      disabled={applicant && applicant.applicantForwarded}
                    >
                      Apply For Graduate Program
                    </Button>
                  </Link>
                </GridItem>
              </GridItem>
            </GridContainer>
          </CardBody>
          &nbsp;
        </Card>
        <Divider variant='middle' />
        <h3 align='center'>Application Details</h3>
        <p align='center'>
          Here you can review your application details that you just submitted
        </p>
        &nbsp;
        <Card>
          <CardHeader color='info'>
            <h1 className={classes.cardTitleWhite}>Personal Details</h1>
          </CardHeader>
          <CardBody>
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
                  <h4>Name: {personalDetails.name}</h4>
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
                  <h4>Father's Name: {personalDetails.fatherName}</h4>
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
                  <h4>CNIC Number: {personalDetails.cnicNumber}</h4>
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
                  fontWeight='fontWeightBold'
                  fontSize={16}
                >
                  <h4>Front Picture</h4>
                  <FormImage
                    picture={personalDetails.cnicFrontPicture}
                    title='Front Picture'
                  />
                </Box>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <Box
                  component='div'
                  display='inline'
                  p={1}
                  m={1}
                  fontWeight='fontWeightBold'
                  fontSize={16}
                >
                  <h4>Back Picture</h4>
                  <FormImage
                    picture={personalDetails.cnicBackPicture}
                    title='Back Picture'
                  />
                </Box>
              </GridItem>
            </GridContainer>
            <Divider variant='middle' />
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
                  <h4>Address: {personalDetails.address}</h4>
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
                  <h4>Place of birth: {personalDetails.placeOfBirth}</h4>
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
                    Date of birth:{' '}
                    <Moment format='DD/MM/YYYY'>
                      {personalDetails.dateOfBirth}
                    </Moment>
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
                  <h4>Phone Number: {personalDetails.phoneNumber}</h4>
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
                  <h4>Domicile: {personalDetails.domicile}</h4>
                </Box>
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
        &nbsp;
        <Card>
          <CardHeader color='info'>
            <h1 className={classes.cardTitleWhite}>Income Details</h1>
          </CardHeader>
          <CardBody>
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
                  <h4>Monthly Income: {incomeDetails.monthlyIncome}</h4>
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
                    Minimum Yearly Income: {incomeDetails.minimumYearlyIncome}
                  </h4>
                </Box>
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
        &nbsp;
        <Card>
          <CardHeader color='info'>
            <h1 className={classes.cardTitleWhite}>Education Details</h1>
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
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

Dashboard.propTypes = {
  getCurrentApplicant: PropTypes.func.isRequired,
  checkMeritStatus: PropTypes.func.isRequired,
  applicant: PropTypes.object.isRequired,
  program: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  applicant: state.applicant,
  program: state.program,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCurrentApplicant,
  checkMeritStatus,
})(withRouter(Dashboard));
