import React from 'react';
import { equals } from 'ramda';

import { Preloader } from './deps/Preloader/Preloader';
import { Communication } from './deps/types';

type Status = 'pending' | 'error' | 'success';

type Props = {
  communication: Communication;
  children?: React.ReactNode | ((status: Exclude<Status, 'pending'>) => React.ReactNode),
  withPreloader?: boolean;
  onResolve?: (status: Exclude<Status, 'pending'>) => void;
};

type State = {
  status: Status
};

function isCompletedComm(prev: Communication, next: Communication): boolean {
  return prev.isRequesting && !next.isRequesting && !next.error;
}

class ResolvedCommunication extends React.Component<Props, State> {
  public state: State = {
    status: 'pending',
  };

  componentDidUpdate(prevProps: Props) {
    const { status } = this.state;
    const { communication: previousComm } = prevProps;
    const { communication: currentComm } = this.props;
    const isCompleted = isCompletedComm(
      previousComm,
      currentComm,
    );
    const errorStatus = currentComm.error && 'error';
    const newStatus = isCompleted
      ? 'success'
      : errorStatus || 'pending';

    if (
      newStatus !== 'pending'
      && !equals(status, newStatus)
      && !equals(previousComm, currentComm)
    ) {
      const { onResolve } = this.props;
      onResolve && newStatus && onResolve(newStatus);
      this.setState({ status: newStatus }); // eslint-disable-line
    }
  }

  render() {
    const { communication, children, withPreloader } = this.props;
    const { status } = this.state;
    if (status === 'pending') {
      return withPreloader && communication.isRequesting ? <Preloader /> : null;
    }

    return children instanceof Function ? children(status) : children;
  }
}

export { ResolvedCommunication };
