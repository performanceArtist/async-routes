import { AppReduxState, Communication } from 'shared/types';

export const initialCommunication: Communication = {
  isRequesting: false,
};

export const initial: AppReduxState = {
  user: null,
  login: initialCommunication,
  checkAuth: initialCommunication
}
