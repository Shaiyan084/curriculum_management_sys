import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Spinner } from 'reactstrap';
import Alert from '../../components/Alert/Alert';
import ProfilePicture from './ProfilePicture';
import Name from './Name';
import Password from './Password';

const Settings = ({ auth: { userLoading, loading, user } }) => {
  return (
    <Fragment>
      <div className='content'>
        {userLoading ? (
          <Fragment>
            <Row>
              <Col xs='12' sm='12' md='12'>
                <div style={{ textAlign: 'center' }}>
                  <Spinner color='primary' />
                </div>
              </Col>
            </Row>
          </Fragment>
        ) : (
          !loading &&
          user !== null && (
            <Fragment>
              <Row>
                <Col xs='12' sm='12' md='12'>
                  <Alert />
                </Col>
              </Row>
              <ProfilePicture avatar={user.avatar} />
              <Name />
              <Password />
            </Fragment>
          )
        )}
      </div>
    </Fragment>
  );
};

Settings.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Settings);
