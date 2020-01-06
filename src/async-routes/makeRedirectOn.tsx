import React from 'react';
import { Redirect, withRouter, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';

import { AppReduxState } from 'shared/types';

type OwnProps<T> = {
  to: string;
  condition: (stateField: T) => boolean;
  children?: React.ReactNode;
};
type StateProps<T> = {
  stateField: T
};
type Props<T> = OwnProps<T> & StateProps<T> & RouteComponentProps;
type Selector<T> = (state: AppReduxState) => T;

function makeMapState<T>(selector: Selector<T>) {
  return (state: AppReduxState): StateProps<T> => ({
    stateField: selector(state),
  });
}

class RedirectOn<T> extends React.Component<Props<T>> {
  render() {
    const { children, history, to, stateField, condition } = this.props;

    if (condition(stateField) && history.location.pathname !== to) {
      return <Redirect to={to} />;
    }

    return children || null;
  }
}

function makeRedirectOn<T>(selector: Selector<T>) {
  const mapState = makeMapState(selector);
  const Wrapper = withRouter(connect(mapState)(RedirectOn));

  return (props: OwnProps<T>) => (Component: React.ComponentClass | React.FC) => () => (
    <Wrapper {...props}>
      <Component />
    </Wrapper>
  );
}

export { makeRedirectOn };
