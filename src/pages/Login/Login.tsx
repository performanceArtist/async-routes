import React from 'react';
import { connect } from 'react-redux';

import { loginRequest } from '../../auth/actions';

type Props = typeof mapDispatch;

type State = {
  username: string;
  password: string;
}

const mapDispatch = { loginRequest };

class Login extends React.Component<Props, State> {
  public state: State = {
    username: '',
    password: ''
  };

  constructor(props: Props) {
    super(props);

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    const { username, password } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          Username(it's "test")
          <input
            name="username"
            type="text"
            value={username}
            onChange={this.handleUsernameChange}
          />
        </div>
        <div>
          Password(it's "test")
          <input
            name="password"
            type="password"
            value={password}
            onChange={this.handlePasswordChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    )
  }

  private handleUsernameChange(event: any) {
    this.setState({ username: event.target.value })
  }

  private handlePasswordChange(event: any) {
    this.setState({ password: event.target.value })
  }

  private handleSubmit(event: any) {
    event.preventDefault();
    const { loginRequest } = this.props;
    const { username, password } = this.state;

    loginRequest(username, password);
  }
}

const connectedComponent = connect(null, mapDispatch)(Login);
export { connectedComponent as Login };
