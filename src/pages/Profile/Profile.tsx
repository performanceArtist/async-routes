import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../../auth/actions';

type Props = typeof mapDispatch;

const mapDispatch = { logout };

const Profile: React.FC<Props> = ({ logout }) => {
  return (
    <div>
      <h2>Profile</h2>
      <Link to="/profile/edit">Edit</Link>
      <div>
        <button type="button" onClick={() => logout()}>Log out</button>
      </div>
    </div>
  );
}

const connectedComponent = connect(null, mapDispatch)(Profile);
export { connectedComponent as Profile };
