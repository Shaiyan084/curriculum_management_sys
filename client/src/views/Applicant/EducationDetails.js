import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { connect } from 'react-redux';
import {
  getCurrentApplicant,
  updateEducationDetails,
} from '../../actions/applicant';
import { setAlert } from '../../actions/alert';
import { TextField } from '@material-ui/core';
import StatusStepper from './StatusStepper';
import FormImage from './FormImage';
import { Redirect } from 'react-router-dom';

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

const EducationDetails = ({
  getCurrentApplicant,
  applicant: { loading, applicant },
  updateEducationDetails,
  setAlert,
}) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
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

  const {
    secondaryEducationType,
    secondaryEducationInstitute,
    secondaryEducationFieldOfStudy,
    secondaryEducationFrom,
    secondaryEducationTo,
    secondaryEducationObtainedMarks,
    secondaryEducationTotalMarks,
    secondaryEducationPicture,
    intermediateEducationType,
    intermediateEducationInstitute,
    intermediateEducationFieldOfStudy,
    intermediateEducationFrom,
    intermediateEducationTo,
    intermediateEducationObtainedMarks,
    intermediateEducationTotalMarks,
    intermediateEducationPicture,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeImage = (e) => {
    const name = e.target.name;
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData({ ...formData, [name]: e.target.result });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (secondaryEducationType === '' || intermediateEducationType === '') {
      setAlert('All fields are required');
    } else {
      updateEducationDetails(formData);
    }
  };

  const [getCurrentApplicantCalled, setGetCurrentApplicantCalled] = useState(
    false
  );

  useEffect(() => {
    if (!getCurrentApplicantCalled) {
      getCurrentApplicant();
      setGetCurrentApplicantCalled(true);
    }

    setFormData({
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
    });
  }, [applicant]);

  if (!loading && applicant !== null && applicant.status < 2) {
    return <Redirect to='/applicant/income-details' />;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Education Details</h4>
            <p className={classes.cardCategoryWhite}>
              Fill in the information below update your education details
            </p>
          </CardHeader>
          <CardBody>
            <StatusStepper
              status={!loading && applicant !== null ? applicant.status : 0}
            />
            <form onSubmit={(e) => onSubmit(e)}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <div className='heading-primary'>Secondary Education</div>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl variant='outlined' className='form-control'>
                    <InputLabel id='program-label'>Type</InputLabel>
                    <Select
                      labelId='program-label'
                      label='Type'
                      name='secondaryEducationType'
                      value={secondaryEducationType}
                      onChange={(e) => onChange(e)}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={0}>Matric</MenuItem>
                      <MenuItem value={1}>O Level</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <TextField
                    className='form-control'
                    label='Institute'
                    variant='outlined'
                    type='text'
                    name='secondaryEducationInstitute'
                    value={secondaryEducationInstitute}
                    onChange={(e) => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <TextField
                    className='form-control'
                    label='Field of Study'
                    variant='outlined'
                    type='text'
                    name='secondaryEducationFieldOfStudy'
                    value={secondaryEducationFieldOfStudy}
                    onChange={(e) => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    className='form-control'
                    label='From'
                    variant='outlined'
                    type='number'
                    name='secondaryEducationFrom'
                    value={secondaryEducationFrom}
                    onChange={(e) => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    className='form-control'
                    label='To'
                    variant='outlined'
                    type='number'
                    name='secondaryEducationTo'
                    value={secondaryEducationTo}
                    onChange={(e) => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    className='form-control'
                    label='Obtained marks'
                    variant='outlined'
                    type='number'
                    name='secondaryEducationObtainedMarks'
                    value={secondaryEducationObtainedMarks}
                    onChange={(e) => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    className='form-control'
                    label='Total marks'
                    variant='outlined'
                    type='number'
                    name='secondaryEducationTotalMarks'
                    value={secondaryEducationTotalMarks}
                    onChange={(e) => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <div className='file-input'>
                    <label forHtml='frontPicture'>Secondary Certificate</label>
                    <input
                      id='backPicture'
                      type='file'
                      name='secondaryEducationPicture'
                      onChange={(e) => onChangeImage(e)}
                    />
                  </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormImage
                    title='Secondary Certificate'
                    picture={secondaryEducationPicture}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <div className='heading-primary'>Intermediate Education</div>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl variant='outlined' className='form-control'>
                    <InputLabel id='program-label'>Type</InputLabel>
                    <Select
                      labelId='program-label'
                      label='Type'
                      name='intermediateEducationType'
                      value={intermediateEducationType}
                      onChange={(e) => onChange(e)}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={0}>F.Sc. Pre-Engineering</MenuItem>
                      <MenuItem value={1}>F.Sc. Pre-Medical</MenuItem>
                      <MenuItem value={2}>A Levels</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <TextField
                    className='form-control'
                    label='Institute'
                    variant='outlined'
                    type='text'
                    name='intermediateEducationInstitute'
                    value={intermediateEducationInstitute}
                    onChange={(e) => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <TextField
                    className='form-control'
                    label='Field of Study'
                    variant='outlined'
                    type='text'
                    name='intermediateEducationFieldOfStudy'
                    value={intermediateEducationFieldOfStudy}
                    onChange={(e) => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    className='form-control'
                    label='From'
                    variant='outlined'
                    type='number'
                    name='intermediateEducationFrom'
                    value={intermediateEducationFrom}
                    onChange={(e) => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    className='form-control'
                    label='To'
                    variant='outlined'
                    type='number'
                    name='intermediateEducationTo'
                    value={intermediateEducationTo}
                    onChange={(e) => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    className='form-control'
                    label='Obtained marks'
                    variant='outlined'
                    type='number'
                    name='intermediateEducationObtainedMarks'
                    value={intermediateEducationObtainedMarks}
                    onChange={(e) => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    className='form-control'
                    label='Total marks'
                    variant='outlined'
                    type='number'
                    name='intermediateEducationTotalMarks'
                    value={intermediateEducationTotalMarks}
                    onChange={(e) => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <div className='file-input'>
                    <label forHtml='frontPicture'>
                      Intermediate Certificate
                    </label>
                    <input
                      id='backPicture'
                      type='file'
                      name='intermediateEducationPicture'
                      onChange={(e) => onChangeImage(e)}
                    />
                  </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormImage
                    title='Intermediate Certificate'
                    picture={intermediateEducationPicture}
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
  getCurrentApplicant: PropTypes.func.isRequired,
  applicant: PropTypes.object.isRequired,
  updateEducationDetails: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  applicant: state.applicant,
});

export default connect(mapStateToProps, {
  getCurrentApplicant,
  updateEducationDetails,
  setAlert,
})(EducationDetails);
