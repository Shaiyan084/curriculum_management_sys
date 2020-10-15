import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentSession } from '../../actions/admission';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const LandingNavbar = ({
  getCurrentSession,
  admission: { loading, session }
}) => {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = event => {
    setAuth(event.target.checked);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getCurrentSession();
  }, []);

  return (
    <Fragment>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h6' className='navbar-title'>
            <Link to='/' className='text-decoration-none'>
              CMS
            </Link>
          </Typography>

          <Button onClick={handleMenu} color='inherit' className='text-bold'>
            Login
          </Button>
          <Menu
            id='menu-appbar'
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Button color='inherit' className='text-bold'>
                <Link to='/login/admin' className='text-decoration-none'>
                  Admin Login
                </Link>
              </Button>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Button color='inherit' className='text-bold'>
                <Link to='/login/coordinator' className='text-decoration-none'>
                  Coordinator Login
                </Link>
              </Button>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Button color='inherit' className='text-bold'>
                <Link to='/login/applicant' className='text-decoration-none'>
                  Applicant Login
                </Link>
              </Button>
            </MenuItem>
          </Menu>

          {!loading && session !== null && session.status && (
            <Button color='inherit' className='text-bold'>
              <Link to={'/register/applicant'} className='text-decoration-none'>
                Apply Now
              </Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

LandingNavbar.propTypes = {
  getCurrentSession: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  admission: state.admission
});

export default connect(mapStateToProps, { getCurrentSession })(LandingNavbar);
