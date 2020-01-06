import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppReduxState } from 'shared/types';
import { logout } from '../../auth/actions';
import { selectTodos } from '../../auth/selectors';

type Props = typeof mapDispatch & ReturnType<typeof mapState>;

const mapDispatch = { logout };
const mapState = (state: AppReduxState) => ({
  todos: selectTodos(state)
});

const Profile: React.FC<Props> = ({ logout, todos }) => {
  return (
    <div>
      <h2>Profile</h2>
      <Link to="/profile/edit">Edit</Link>
      <div>
        <button type="button" onClick={() => logout()}>Log out</button>
      </div>
      <h3>Todos:</h3>
      <div>
        {todos.map(todo => <div key={todo}><strong>{todo}</strong></div>)}
      </div>
    </div>
  );
}

const connectedComponent = connect(mapState, mapDispatch)(Profile);
export { connectedComponent as Profile };
