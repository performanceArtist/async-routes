import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h2>Index</h2>
      <Link to="/login">Log in</Link>
      <Link to="/public">Public</Link>
    </div>
  );
}

export { HomePage };
