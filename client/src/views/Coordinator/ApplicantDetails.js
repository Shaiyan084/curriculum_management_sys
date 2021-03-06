import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getApplicantById } from '../../actions/applicant';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import Divider from '@material-ui/core/Divider';
import FormImage from '../Applicant/FormImage';
import { TextField, Button, Box } from '@material-ui/core';

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

const ApplicantDetails = ({
  getApplicantById,
  applicant: { loading, applicant },
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
    intermediateEducationPicture: '',
    universityTestScore: '',
    totalAggregate: ''
  });

  useEffect(() => {
    if (!getApplicantByIdCalled) {
      getApplicantById(match.params.id);
      setGetApplicantByIdCalled(true);
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
      email:
        !loading && applicant !== null && applicant.personalDetails
          ? applicant.personalDetails.email
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
          : '',
      universityTestScore:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.universityTestScore
          : '',
      totalAggregate:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.totalAggregate
          : ''
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
                <p className={classes.cardCategoryWhite}>
                  Applicant's information
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
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
                  &nbsp;
                  <GridItem xs={12} sm={12} md={12}>
                    <Divider variant='middle' />
                    <p>Name:</p>
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
                    <p>Father Name:</p>
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
                    <p>Email:</p>
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
                        {personalDetails.email}
                      </h4>
                    </Box>
                    <Divider variant='middle' />
                    <p>Minimum Yearly Income:</p>
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
                        {incomeDetails.minimumYearlyIncome}
                      </h4>
                    </Box>
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
                  Applicants education details
                </p>
              </CardHeader>
              <CardBody>
                <h3>Secondary Education Details</h3>
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
                  <GridItem xs={12} sm={12} md={12}>
                    <Link
                      to={'/coordinator/manage-applicants'}
                      className='text-decoration-none'
                    >
                      <Button
                        color='primary'
                        variant='contained'
                        type='submit'
                        size='large'
                      >
                        Back
                      </Button>
                    </Link>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
};

ApplicantDetails.propTypes = {
  getApplicantById: PropTypes.func.isRequired,
  applicant: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  applicant: state.applicant,
  auth: state.auth
});

export default connect(mapStateToProps, { getApplicantById })(
  withRouter(ApplicantDetails)
);
