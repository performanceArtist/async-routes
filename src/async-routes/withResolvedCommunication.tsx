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
type OwnProps = {
  action: () => Action<any>;
  children: React.ReactNode
}

type Props = OwnProps & StateProps;

class WithResolvedCommunication extends React.Component<Props> {
  componentDidMount() {
    const { action, shouldUpdate } = this.props;

    if (shouldUpdate) {
      action();
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

function makeWithResolvedCommunication(args: {
  selector: CommunicationSelector,
  action: () => Action<any>,
  shouldUpdate: (state: AppReduxState) => boolean,
}) {
  const { selector, action, shouldUpdate } = args;
  const mapDispatch = { action };
  const mapState = makeMapState(selector, shouldUpdate);
  const Wrapper = connect(mapState, mapDispatch)(WithResolvedCommunication);

  return (Component: React.ComponentClass | React.FC) => () => (
    <Wrapper>
      <Component />
    </Wrapper>
  );
}

export { makeWithResolvedCommunication };
