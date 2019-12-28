import React from 'react';
import { Redirect } from 'react-router-dom';
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
type Props<T> = OwnProps<T> & StateProps<T>;
type Selector<T> = (state: AppReduxState) => T;

function makeMapState<T>(selector: Selector<T>) {
  return (state: AppReduxState): StateProps<T> => ({
    stateField: selector(state),
  });
}

class RedirectOn<T> extends React.Component<Props<T>> {
  render() {
    const { children, to, stateField, condition } = this.props;

    console.log('redirect');
    if (condition(stateField)) {
      return <Redirect to={to} />;
    }

    return children || null;
  }
}

function makeRedirectOn<T>(selector: Selector<T>) {
  return (props: OwnProps<T>) => {
    const mapState = makeMapState(selector);
    const Wrapper = connect(mapState)(RedirectOn);

    return (Component: React.ComponentClass | React.FC) => () => (
      <Wrapper {...props}>
        <Component />
      </Wrapper>
    );
  };
}

export { makeRedirectOn };
