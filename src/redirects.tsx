import { pipe, not } from 'ramda';

import { selectors as authSelectors, actions as authActions } from './auth';
import { makeRedirectOn, makeWithResolvedCommunication } from './async-routes';

const userRedirect = makeRedirectOn(authSelectors.selectUser);

export const withAuthRedirect = userRedirect({
  to: '/login',
  condition: user => !user,
});

export const withProfileRedirect = userRedirect({
  to: '/profile',
  condition: user => Boolean(user),
});

const getToken = () => {
  return localStorage.getItem('token');
}

const withAuthRequest = makeWithResolvedCommunication({
  selector: authSelectors.selectCheckAuthComm,
  provider: getToken,
  action: authActions.checkAuthRequest,
  shouldUpdate: pipe(authSelectors.selectUser, not),
});

export const withAuth = pipe(withAuthRequest, withAuthRedirect);
export const withProfile = pipe(withAuthRequest, withProfileRedirect);
