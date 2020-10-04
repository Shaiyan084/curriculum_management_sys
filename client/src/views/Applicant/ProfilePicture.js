import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadProfilePicture, removeProfilePicture } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import { makeStyles } from '@material-ui/core';
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
import { FormGroup, Input } from 'reactstrap';

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
  },
  root: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

const useStyles = makeStyles(styles);

const ProfilePicture = ({
  uploadProfilePicture,
  removeProfilePicture,
  setAlert,
  avatar
}) => {
  const classes = useStyles(styles);

  const [formData, setFormData] = useState({ image: '' });

  const { image } = formData;

  const onChange = e => {
    const reader = new FileReader();
    reader.onload = e => {
      setFormData({ ...formData, image: e.target.result });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (image === '') {
      setAlert('No image selected', 'danger');
    } else {
      uploadProfilePicture(formData);
      setFormData({ image: '' });
    }
  };
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Profile Picture</h4>
            <p className={classes.cardCategoryWhite}>
              Upload your profile picture
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={e => onSubmit(e)}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <div
                    style={{
                      textAlign: 'center',
                      marginBottom: '10px'
                    }}
                  >
                    <img
                      src={avatar}
                      alt=''
                      style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%'
                      }}
                    />
                  </div>
                  <FormGroup>
                    <Input type='file' onChange={e => onChange(e)} />
                  </FormGroup>
                  &nbsp;{' '}
                  <GridContainer align='center'>
                    <GridItem xs={12} sm={12} md={6}>
                      <Button color='primary' variant='contained' type='submit'>
                        Update Profile Picture
                      </Button>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <Button
                        className='margin-left-right margin-top-bottom button-danger'
                        variant='contained'
                        type='submit'
                        onClick={() => removeProfilePicture()}
                      >
                        Remove Profile Picture
                      </Button>
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </form>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

ProfilePicture.propTypes = {
  uploadProfilePicture: PropTypes.func.isRequired,
  removeProfilePicture: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired
};

export default connect(null, {
  uploadProfilePicture,
  removeProfilePicture,
  setAlert
})(ProfilePicture);
