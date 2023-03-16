import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from '@plone/volto/helpers';
import { compose } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Container,
  Button,
  Form,
  Input,
  Segment,
  Grid,
} from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import qs from 'query-string';
import { withRouter } from 'react-router-dom';

import { Icon } from '@plone/volto/components';
import { login } from '@plone/volto/actions';
import { toast } from 'react-toastify';
import { Toast } from '@plone/volto/components';

import aheadSVG from '@plone/volto/icons/ahead.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

import config from '@plone/volto/registry';

const messages = defineMessages({
  login: {
    id: 'Log in',
    defaultMessage: 'Login',
  },
  loginName: {
    id: 'Login Name',
    defaultMessage: 'Login Name',
  },
  Login: {
    id: 'Login',
    defaultMessage: 'Login',
  },
  password: {
    id: 'Password',
    defaultMessage: 'Password',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
  loginFailed: {
    id: 'Login Failed',
    defaultMessage: 'Login Failed',
  },
  loginFailedContent: {
    id: 'Both email address and password are case sensitive, check that caps lock is not enabled.',
    defaultMessage:
      'Both email address and password are case sensitive, check that caps lock is not enabled.',
  },
  register: {
    id: 'Register',
    defaultMessage: 'Register',
  },
  forgotPassword: {
    id: 'box_forgot_password_option',
    defaultMessage: 'Forgot your password?',
  },
});

const Login = (props) => {
  //dispatch left
  const dispatch = useDispatch();
  const error = useSelector((state) => state.userSession.login.error);
  const loading = useSelector((state) => state.userSession.login.loading);
  const token = useSelector((state) => state.userSession.token);
  const returnUrl =
    qs.parse(props.location.search).return_url ||
    props.location.pathname
      .replace(/\/login\/?$/, '')
      .replace(/\/logout\/?$/, '') ||
    '/';

  //replace componentwillreceiveprops
  useEffect(() => {
    console.log('use effect receive props on update');
    if (token) {
      props.history.push(returnUrl || '/');
      if (toast.isActive('loggedOut')) {
        toast.dismiss('loggedOut');
      }
      if (toast.isActive('loginFailed')) {
        toast.dismiss('loginFailed');
      }
    }
    if (error) {
      if (toast.isActive('loggedOut')) {
        toast.dismiss('loggedOut');
      }
      if (!toast.isActive('loginFailed')) {
        toast.error(
          <Toast
            error
            title={props.intl.formatMessage(messages.loginFailed)}
            content={props.intl.formatMessage(messages.loginFailedContent)}
          />,
          { autoClose: false, toastId: 'loginFailed' },
        );
      }
    }
    return () => {
      console.log('unmount return effect');
      if (toast.isActive('loginFailed')) {
        toast.dismiss('loginFailed');
      }
    };
  }, [token, error]);

  /**
   * On login handler
   * @method onLogin
   * @param {Object} event Event object.
   * @returns {undefined}
   */
  // onLogin(event) {
  //   console.log("receive login cred");
  //   this.props.login(
  //     document.getElementsByName('login')[0].value,
  //     document.getElementsByName('password')[0].value,
  //   );
  //   event.preventDefault();
  // }

  const onLogin = (e) => {
    console.log('login action creator dispatched');
    dispatch(
      login(
        document.getElementsByName('login')[0].value,
        document.getElementsByName('password')[0].value,
      ),
    );
    e.preventDefault();
  };

  return (
    <div id="page-login">
      <Helmet title={props.intl.formatMessage(messages.Login)} />
      <Container text>
        <Form method="post" onSubmit={onLogin}>
          <Segment.Group raised>
            <Segment className="primary">
              <FormattedMessage id="Log In" defaultMessage="Login" />
            </Segment>
            <Segment secondary>
              <FormattedMessage
                id="Sign in to start session"
                defaultMessage="Sign in to start session"
              />
            </Segment>
            <Segment className="form">
              <Form.Field inline className="help">
                <Grid>
                  <Grid.Row stretched>
                    <Grid.Column width="4">
                      <div className="wrapper">
                        <label htmlFor="login">
                          <FormattedMessage
                            id="Login Name"
                            defaultMessage="Login Name"
                          />
                        </label>
                      </div>
                    </Grid.Column>
                    <Grid.Column width="8">
                      {/* eslint-disable jsx-a11y/no-autofocus */}
                      <Input
                        id="login"
                        name="login"
                        placeholder={props.intl.formatMessage(
                          messages.loginName,
                        )}
                        autoFocus
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form.Field>
              <Form.Field inline className="help">
                <Grid>
                  <Grid.Row stretched>
                    <Grid.Column stretched width="4">
                      <div className="wrapper">
                        <label htmlFor="password">
                          <FormattedMessage
                            id="Password"
                            defaultMessage="Password"
                          />
                        </label>
                      </div>
                    </Grid.Column>
                    <Grid.Column stretched width="8">
                      <Input
                        type="password"
                        id="password"
                        name="password"
                        placeholder={props.intl.formatMessage(
                          messages.password,
                        )}
                        tabIndex={0}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form.Field>
              <Form.Field inline className="help">
                <Grid>
                  <Grid.Row stretched>
                    {config.settings.showSelfRegistration && (
                      <Grid.Column stretched width="12">
                        <p className="help">
                          <Link to="/register">
                            {props.intl.formatMessage(messages.register)}
                          </Link>
                        </p>
                      </Grid.Column>
                    )}
                    <Grid.Column stretched width="12">
                      <p className="help">
                        <Link to="/passwordreset">
                          {props.intl.formatMessage(messages.forgotPassword)}
                        </Link>
                      </p>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form.Field>
            </Segment>
            <Segment className="actions" clearing>
              <Button
                basic
                primary
                icon
                floated="right"
                type="submit"
                id="login-form-submit"
                aria-label={props.intl.formatMessage(messages.login)}
                title={props.intl.formatMessage(messages.login)}
                loading={loading}
              >
                <Icon className="circled" name={aheadSVG} size="30px" />
              </Button>

              <Button
                basic
                secondary
                icon
                floated="right"
                id="login-form-cancel"
                as={Link}
                to="/"
                aria-label={props.intl.formatMessage(messages.cancel)}
                title={props.intl.formatMessage(messages.cancel)}
              >
                <Icon className="circled" name={clearSVG} size="30px" />
              </Button>
            </Segment>
          </Segment.Group>
        </Form>
      </Container>
    </div>
  );
};

export default compose(withRouter, injectIntl)(Login);
