import React from 'react';
import { connect } from 'react-redux';

import { Communication, Action } from './deps/types';
import { ResolvedCommunication, ResolvedStatus } from './ResolvedCommunication';

type CommunicationSelector<T> = (state: T) => Communication;
type StateProps = {
  communication: Communication,
  shouldUpdate: boolean | null
};

type Props = StateProps & { action: () => Action<[]> };

class WithResolvedCommunication extends React.Component<Props> {
  componentDidMount() {
    const { action, shouldUpdate } = this.props;

    if (shouldUpdate === null) {
      action();
      return;
    }

    shouldUpdate && action();
  }

  render() {
    const { children, communication, shouldUpdate } = this.props;

    if (shouldUpdate !== null && !shouldUpdate) {
      return children instanceof Function ? children(communication.error ? 'error' : 'success') : children;
    }

    return (
      <ResolvedCommunication
        communication={communication}
        withPreloader
      >
        {children}
      </ResolvedCommunication>
    );
  }
}

function makeMapState<T>(
  selector: CommunicationSelector<T>,
  shouldUpdate?: (state: T) => boolean,
) {
  return (state: T): StateProps => ({
    communication: selector(state),
    shouldUpdate: shouldUpdate ? shouldUpdate(state) : null,
  });
}

type Component = React.ComponentClass | React.FC;
type RouteDecorator = (next: Component) => () => JSX.Element;
type Fork = {
  onSuccess: RouteDecorator,
  onFailure: RouteDecorator
};

function makeFork(fork: Fork, next: Component) {
  const { onSuccess, onFailure } = fork;

  return (status: ResolvedStatus) => (status === 'success'
    ? onSuccess(next)()
    : onFailure(next)());
}

function makeWithResolvedCommunication<T = never>(args: {
  selector: CommunicationSelector<T>,
  action: () => Action<[]>,
  shouldUpdate?: (state: T) => boolean,
  fork?: Fork
}) {
  const { selector, action, shouldUpdate, fork } = args;
  const mapDispatch = { action };
  const mapState = makeMapState(selector, shouldUpdate);
  const Wrapper = connect(mapState, mapDispatch)(WithResolvedCommunication);

  return (Component: Component) => () => (
    <Wrapper>
      {fork ? makeFork(fork, Component) : <Component />}
    </Wrapper>
  );
}

export { makeWithResolvedCommunication };
