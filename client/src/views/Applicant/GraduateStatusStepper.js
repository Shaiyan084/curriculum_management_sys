import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Stepper, Step, StepLabel } from '@material-ui/core';

const GraduateStatusStepper = ({ status }) => {
  return (
    <Fragment>
      <Stepper activeStep={status} alternativeLabel>
        <Step>
          <StepLabel>Personal Details</StepLabel>
        </Step>
        <Step>
          <StepLabel>Income Details</StepLabel>
        </Step>
        <Step>
          <StepLabel>Education Details</StepLabel>
        </Step>
        <Step>
          <StepLabel>Bachelor Details</StepLabel>
        </Step>
      </Stepper>
    </Fragment>
  );
};

GraduateStatusStepper.propTypes = {
  status: PropTypes.number.isRequired
};

export default GraduateStatusStepper;
