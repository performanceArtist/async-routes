import {
  compose,
  pipe,
  not,
  both,
  propSatisfies,
  length,
  equals
} from 'ramda';

import { selectors as authSelectors, actions as authActions } from './auth';
import { makeRedirectOn, makeWithResolvedCommunication } from './async-routes';

const userRedirect = makeRedirectOn(authSelectors.selectUser);

export const withAuthRedirect = userRedirect({
  to: '/login',
  condition: user => !user,
});

const profileRedirect = makeRedirectOn(state => ({
  user: authSelectors.selectUser(state),
  comm: authSelectors.selectCheckAuthComm(state)
}));

export const withProfileRedirect = profileRedirect({
  to: '/profile',
  condition: ({ user, comm }) => Boolean(user) && !comm.error,
});

const withUserDataRequest = makeWithResolvedCommunication({
  selector: authSelectors.selectFetchUserDataComm,
  action: authActions.fetchUserDataRequest,
  shouldUpdate: pipe(authSelectors.selectTodos, length, equals(0)),
});

const withAuthRequest = makeWithResolvedCommunication({
  selector: authSelectors.selectCheckAuthComm,
  action: authActions.checkAuthRequest,
  shouldUpdate: both(
    pipe(authSelectors.selectUser, not),
    pipe(authSelectors.selectCheckAuthComm, propSatisfies(not, 'error'))
  ),
  fork: {
    onFailure: withAuthRedirect,
    onSuccess: withUserDataRequest
  }
});

export const withAuth = withAuthRequest;
export const withProfile = compose(withAuthRequest, withProfileRedirect);
