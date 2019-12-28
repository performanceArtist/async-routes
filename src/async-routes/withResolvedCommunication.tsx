import React from 'react';
import { connect } from 'react-redux';

import { AppReduxState } from 'shared/types';

import { Communication, Action } from './deps/types';
import { ResolvedCommunication } from './ResolvedCommunication';

type CommunicationSelector = (state: AppReduxState) => Communication;
type StateProps = {
  communication: Communication,
  shouldUpdate: boolean
};
type OwnProps<T> = {
  action: (deps?: T) => Action<T>;
  provider?: () => T,
  children: React.ReactNode
}

type Props<T> = OwnProps<T> & StateProps;

class WithResolvedCommunication<T> extends React.Component<Props<T>> {
  componentDidMount() {
    const { action, provider, shouldUpdate } = this.props;

    if (shouldUpdate) {
      provider ? action(provider()) : action();
    }
  }

  render() {
    const { children, communication, shouldUpdate } = this.props;

    if (!shouldUpdate) {
      return children;
    }

    return (
      <ResolvedCommunication communication={communication} withPreloader>
        {children}
      </ResolvedCommunication>
    );
  }
}

function makeMapState(
  selector: CommunicationSelector,
  shouldUpdate: (state: AppReduxState) => boolean,
) {
  return (state: AppReduxState): StateProps => ({
    communication: selector(state),
    shouldUpdate: shouldUpdate(state),
  });
}

function makeWithResolvedCommunication<T = undefined>(args: {
  selector: CommunicationSelector,
  action: (deps?: T) => Action<any>,
  shouldUpdate: (state: AppReduxState) => boolean,
  provider?: () => T,
}) {
  const { selector, action, shouldUpdate, provider } = args;
  const mapDispatch = { action };
  const mapState = makeMapState(selector, shouldUpdate);
  const Wrapper = connect(mapState, mapDispatch)(WithResolvedCommunication);

  return (Component: React.ComponentClass | React.FC) => () => (
    <Wrapper provider={provider}>
      <Component />
    </Wrapper>
  );
}

export { makeWithResolvedCommunication };
