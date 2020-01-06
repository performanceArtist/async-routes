import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { HomePage } from './pages/Homepage/HomePage';
import { Public } from './pages/Public/Public';
import { Profile } from './pages/Profile/Profile';
import { ProfileEdit } from './pages/ProfileEdit/ProfileEdit';
import { Login } from './pages/Login/Login';
import { store } from './store';
import { withAuth, withProfile } from './redirects';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/public" component={Public} />
          <Route path="/login" component={withProfile(Login)} />
          <Route exact path="/profile" component={withAuth(Profile)} />
          <Route path="/profile/edit" component={withAuth(ProfileEdit)} />
        </Switch>
      </HashRouter>
    </Provider>
  );
}

export { App };
