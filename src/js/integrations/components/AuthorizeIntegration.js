import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { func, shape } from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
import isEmpty from 'is-empty';
import ErrorBlock from 'theme-claire/src/atoms/ErrorBlock';
import Button from 'theme-claire/src/atoms/Button';
import Loading from 'theme-claire/src/atoms/Loading';
import Card from 'theme-claire/src/atoms/Card';
import Fullscreen from 'theme-claire/src/atoms/Fullscreen';
import Scopes from './Scopes';
import {
  getCredential,
  getCredentialsByClient,
  getIntegration,
  createCode,
} from 'js/integrations/actions';

class AuthorizeIntegration extends Component {
  static propTypes = {
    createCode: func.isRequired,
    history: shape({
      push: func.isRequired,
    }),
  }

  state = {
    name: '',
    shortDescription: '',
    scopes: null,
    hasAccessToken: false,
  }

  componentDidMount() {
    const {
      getCredential,
      getCredentialsByClient,
      getIntegration,
    } = this.props;
    const {
      uuid,
      clientId,
      redirectUri,
      state,
    } = queryString.parse(window.location.search);

    let p = null;
    if (uuid) {
      const request = getCredential(uuid);
      p = request.response.then(({ body }) => {
        return body.clientId;
      });
    } else {
      p = Promise.resolve(clientId);
    }

    p.then((clientId) => {
      if (isEmpty(clientId)) {
        this.setState({
          error: 'No valid integration was found',
        });
        return;
      }

      this.setState({
        clientId,
        redirectUri,
        state,
      });

      const request = getCredentialsByClient(clientId);
      return request.response.then(({ body, res }) => {
        const { hasAccessToken, integrationUuid, scopes } = body;

        const integrationRequest = getIntegration(integrationUuid);

        return integrationRequest.response.then(({ body, res }) => {
          const { name, shortDescription } = body;

          this.setState({
            name,
            shortDescription,
            scopes,
            hasAccessToken,
          });
        });
      });
    }).catch(() => {
      this.setState({
        error: 'We couldn\'t find that integration',
      });
    });
  }

  handleActivate = (e) => {
    e.preventDefault();
    const { createCode } = this.props;
    const { clientId, redirectUri, state } = this.state;

    // Ask auth for a code
    const request = createCode({
      clientId,
      redirectUri,
      state,
    });

    request.response.then(({ body, res }) => {
      const { redirectionLink } = body;

      // Redirect the user to the redirect uri
      if (redirectionLink) {
        window.location = redirectionLink;
      } else {
        this.setState({
          error: 'We couldn\'t activate this integration',
        });
      }
    }).catch(() => {
      this.setState({
        error: 'We couldn\'t activate this integration',
      });
    });
  }

  render() {
    const {
      error,
      history,
      name,
      shortDescription,
      scopes,
      hasAccessToken,
    } = this.state;

    return (
      <Fullscreen history={history}>
        {
          error
            ? <ErrorBlock>{error}</ErrorBlock>
            : <div>
              <h1>Activate {name}</h1>
              <p>
                {shortDescription}
              </p>
              <p>
                This integration is requesting the following permissions:
              </p>
              {
                scopes
                  ? <Card><Scopes scopes={scopes} /></Card>
                  : <Loading />
              }
              <p>
                {
                  hasAccessToken
                    ? <Button primary onClick={this.handleActivate}>Reactivate</Button>
                    : <Button primary onClick={this.handleActivate}>Activate</Button>
                }
              </p>
            </div>
        }
      </Fullscreen>
    );
  }
}

export default connect(
  null,
  {
    getCredential,
    getCredentialsByClient,
    getIntegration,
    createCode,
  }
)(withRouter(AuthorizeIntegration));
