import React, { Fragment } from 'react';
import {
  Typography,
  Container,
  Grid,
  Paper,
  TextField,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <Fragment>
      <Container className='container-primary'>
        <Paper elevation={4} className='paper-primary'>
          <Grid container>
            <Grid
              xs={12}
              sm={12}
              md={12}
              item
              className='text-center-horizontal'
            >
              <Typography
                align='center'
                className='title-secondary'
                color='primary'
              >
                Admin Login
              </Typography>
              <div className='description-secondary text-center'>
                Please sign in
              </div>
            </Grid>
            <Grid xs={12} sm={12} md={12} item>
              <form className='form'>
                <TextField
                  className='form-control'
                  label='Email'
                  variant='outlined'
                  type='email'
                />
                <TextField
                  className='form-control'
                  label='Password'
                  variant='outlined'
                  type='password'
                />
                <Link to='/admin' className='text-decoration-none'>
                  <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    // type='submit'
                    className='form-control'
                  >
                    Login
                  </Button>
                </Link>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Fragment>
  );
};

export default Admin;
